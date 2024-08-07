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

// Routes
// app.use(function (req, res, next) {
//   // Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//   next();
// });

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://second-assessment-test-frontend.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use('/calculations', calculationsRoutes);
app.use('/auth', authRoutes);
app.use('/operations', operationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
