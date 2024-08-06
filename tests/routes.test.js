const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const calculationsRoutes = require('../Routes/Calculations');
const authRoutes = require('../Routes/Auth');
const operationsRoutes = require('../Routes/Operations');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/calculations', calculationsRoutes);
app.use('/auth', authRoutes);
app.use('/operations', operationsRoutes);

describe('Test API endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should not register an existing user', async () => {
    await request(app).post('/auth/register').send({
      username: 'existinguser',
      password: 'password123'
    });
    const response = await request(app).post('/auth/register').send({
      username: 'existinguser',
      password: 'password123'
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User already exists');
  });

  it('should authenticate a user', async () => {
    await request(app).post('/auth/register').send({
      username: 'authuser',
      password: 'password123'
    });
    const response = await request(app).post('/auth/login').send({
      username: 'authuser',
      password: 'password123'
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'authuser');
  });

  it('should start a new calculation', async () => {
    const userResponse = await request(app).post('/auth/register').send({
      username: 'calcuser',
      password: 'password123'
    });
    const response = await request(app).post('/calculations/start').send({
      userId: userResponse.body.id,
      number: 10
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('number', 10);
  });

  it('should perform a calculation operation', async () => {
    const userResponse = await request(app).post('/auth/register').send({
      username: 'operationuser',
      password: 'password123'
    });
    const calcResponse = await request(app).post('/calculations/start').send({
      userId: userResponse.body.id,
      number: 20
    });
    const response = await request(app).post('/operations').send({
      calculationId: calcResponse.body.id,
      operation: '+',
      number: 5,
      userId: userResponse.body.id,
      parentNumber: 20
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('result', 25);
  });
});
