require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const topupRoutes = require('./routes/topupRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const swaggerSetup = require('./swagger');
const mysql = require('mysql2');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Database connection using environment variables
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Route integration
app.use('/api/auth', authRoutes); // Prefixing auth routes
app.use('/api', balanceRoutes); // Prefixing balance routes
app.use('/api', topupRoutes); // Prefixing top-up routes
app.use('/api', transactionRoutes); // Prefixing transaction routes

// Swagger setup
swaggerSetup(app);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: null,
  });
});

// Export the app for serverless deployment or start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  module.exports = app; // Export the app for vercel
}
