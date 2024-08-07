const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const calculationsRoutes = require('./Routes/Calculations');
const authRoutes = require('./Routes/Auth');
const operationsRoutes = require('./Routes/Operations');

const app = express();
app.use(bodyParser.json());

// CORS configuration to allow all origins
const corsOptions = {
  origin: '*', // Allow all origins
  optionsSuccessStatus: 200
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Routes
app.use('/calculations', calculationsRoutes);
app.use('/auth', authRoutes);
app.use('/operations', operationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
