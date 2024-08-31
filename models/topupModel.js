const connection = require('../config/db');

const TopUpModel = {
  // Record a top-up transaction and update the user's balance
  topUpBalance: (userId, topUpAmount, callback) => {
    const transactionType = 'TOPUP';

    // SQL query to update balance and record the transaction
    const query = `
      START TRANSACTION;
      UPDATE balances 
      SET balance = balance + ? 
      WHERE user_id = ?;
      
      INSERT INTO transactions (user_id, transaction_type, amount, service_code, invoice_number) 
      VALUES (?, ?, ?, ?, ?);
      COMMIT;
    `;

    // Generating an invoice number
    const invoiceNumber = `INV${new Date().getTime()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    connection.query(
      query,
      [topUpAmount, userId, userId, transactionType, topUpAmount, 'TOPUP', invoiceNumber],
      (err, results) => {
        if (err) {
          // Rollback the transaction in case of error
          return connection.query('ROLLBACK', () => {
            callback(err, null);
          });
        }
        callback(null, results);
      }
    );
  }
};

module.exports = TopUpModel;
