const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.calculations);
});

router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const data = readData();
  const userCalculations = data.calculations.filter(calc => calc.userId === userId);
  res.json(userCalculations);
});

router.post('/start', (req, res) => {
  const { userId, number } = req.body;
  const data = readData();
  const user = data.users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newCalculation = {
    id: uuidv4(),
    number,
    operations: [],
    userId,
    username: user.username 
  };
  data.calculations.push(newCalculation);
  writeData(data);

  res.status(201).json(newCalculation);
});

module.exports = router;
