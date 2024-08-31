const connection = require('../config/db');

const BalanceModel = {
  // Get user balance by email
  getUserBalanceByEmail: (email, callback) => {
    const query = `
      SELECT balance FROM balances 
      WHERE user_id = (SELECT id FROM users WHERE email = ?)
    `;
    connection.query(query, [email], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0] ? results[0].balance : null);
      }
    });
  },

  // Update user balance
  updateUserBalance: (userId, amount, callback) => {
    const query = `
      UPDATE balances 
      SET balance = balance + ? 
      WHERE user_id = ?
    `;
    connection.query(query, [amount, userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Deduct user balance
  deductUserBalance: (userId, amount, callback) => {
    const query = `
      UPDATE balances 
      SET balance = balance - ? 
      WHERE user_id = ?
    `;
    connection.query(query, [amount, userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Create a new balance record for a user
  createBalanceForUser: (userId, initialBalance = 0, callback) => {
    const query = `
      INSERT INTO balances (user_id, balance)
      VALUES (?, ?)
    `;
    connection.query(query, [userId, initialBalance], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = BalanceModel;
