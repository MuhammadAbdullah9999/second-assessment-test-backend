const fs = require('fs');
const DATA_FILE = './data.json';

const readData = () => {
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  writeData
};
