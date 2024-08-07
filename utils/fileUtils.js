const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    console.log('Data read successfully:', data);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err);
    return { users: [], calculations: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written successfully:', data);
  } catch (err) {
    console.error('Error writing data:', err);
  }
};

module.exports = { readData, writeData };
