const connection = require('../config/db');

const TransactionModel = {
  // Create a new transaction
  createTransaction: (userId, transactionType, amount, serviceCode, callback) => {
    // Generate a unique invoice number
    const invoiceNumber = `INV${new Date().getTime()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const query = `
      INSERT INTO transactions (user_id, transaction_type, amount, service_code, invoice_number) 
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(query, [userId, transactionType, amount, serviceCode, invoiceNumber], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {
          invoiceNumber,
          serviceCode,
          amount,
          transactionType,
          createdOn: new Date().toISOString()
        });
      }
    });
  },

  // Retrieve a transaction by invoice number
  getTransactionByInvoiceNumber: (invoiceNumber, callback) => {
    const query = `
      SELECT * FROM transactions 
      WHERE invoice_number = ?
    `;
    
    connection.query(query, [invoiceNumber], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  // Retrieve all transactions for a user
  getTransactionsByUserId: (userId, callback) => {
    const query = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      ORDER BY created_on DESC
    `;
    
    connection.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = TransactionModel;
