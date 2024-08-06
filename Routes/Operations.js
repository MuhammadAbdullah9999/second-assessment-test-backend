const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const { findAndUpdateSubOperations, findCalculationById } = require('../utils/calculationUtils');

router.post('/', (req, res) => {
  const { calculationId, operation, number, userId, parentNumber } = req.body;
  console.log(req.body);

  const data = readData();
  const result = eval(`${parentNumber} ${operation} ${number}`);

  const newOperation = {
    id: uuidv4(),
    number1: parentNumber,
    operand: operation,
    number2: number,
    result,
    userId,
    username: data.users.find(user => user.id === userId).username
  };
  

  const calculationData = findCalculationById(data, calculationId);

  if (!calculationData) {
    return res.status(404).json({ message: 'Calculation not found' });
  }

  if (calculationData.type === 'calculation' && calculationData.item.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized user' });
  }
  if (calculationData.type === 'operation' && calculationData.item.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized user' });
  }

  if (calculationData.type === 'calculation') {
    if (findAndUpdateSubOperations(calculationData.item.operations, calculationId, newOperation)) {
      writeData(data);
      return res.status(201).json(newOperation);
    } else {
      calculationData.item.operations.push(newOperation);
    }
  } else if (calculationData.type === 'operation') {
    if (!calculationData.item.subOperations) {
      calculationData.item.subOperations = [];
    }
    calculationData.item.subOperations.push(newOperation);
  }

  writeData(data);

  res.status(201).json(newOperation);
});

module.exports = router;
