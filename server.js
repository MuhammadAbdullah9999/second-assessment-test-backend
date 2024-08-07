const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const calculationsRoutes = require('./Routes/Calculations');
const authRoutes = require('./Routes/Auth');
const operationsRoutes = require('./Routes/Operations');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

// Use CORS middleware
app.use(cors(corsOptions));

// Routes
app.use(function (req, res, next) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use('/calculations', calculationsRoutes);
app.use('/auth', authRoutes);
app.use('/operations', operationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
