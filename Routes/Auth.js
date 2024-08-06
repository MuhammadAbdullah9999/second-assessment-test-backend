const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const userExists = data.users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: uuidv4(), username, password };
  data.users.push(newUser);
  writeData(data);

  res.status(201).json(newUser);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  const data = readData();
  const user = data.users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  res.json(user);
});

module.exports = router;
