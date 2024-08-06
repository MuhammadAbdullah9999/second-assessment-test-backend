const findAndUpdateSubOperations = (operations, calculationId, newOperation) => {
    for (const op of operations) {
      if (op.id === calculationId) {
        if (!op.subOperations) {
          op.subOperations = [];
        }
        if (newOperation.number1 !== undefined && newOperation.number2 !== undefined && newOperation.result !== undefined) {
          op.subOperations.push(newOperation);
        }
        return true;
      }
      if (op.subOperations && findAndUpdateSubOperations(op.subOperations, calculationId, newOperation)) {
        return true;
      }
    }
    return false;
  };
  
  const findCalculationById = (data, calculationId) => {
    for (const calc of data.calculations) {
      if (calc.id === calculationId) {
        return { type: 'calculation', item: calc };
      }
      if (findAndUpdateSubOperations(calc.operations, calculationId, {})) {
        return { type: 'calculation', item: calc };
      }
    }
    return null;
  };
  
  module.exports = {
    findAndUpdateSubOperations,
    findCalculationById
  };
  