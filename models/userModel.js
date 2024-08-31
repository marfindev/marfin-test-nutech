const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  // Register a new user
  registerUser: (userData, callback) => {
    const { email, first_name, last_name, password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = `
      INSERT INTO users (email, first_name, last_name, password)
      VALUES (?, ?, ?, ?)
    `;
    connection.query(
      query,
      [email, first_name, last_name, hashedPassword],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      }
    );
  },

  // Find user by email
  findUserByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    connection.query(query, [email], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]); // Return the first match, if any
      }
    });
  },

  // Update user details (optional, example placeholder)
  updateUser: (userId, updateData, callback) => {
    const { first_name, last_name, password } = updateData;
    const hashedPassword = password ? bcrypt.hashSync(password, 8) : null;

    const query = `
      UPDATE users 
      SET first_name = ?, last_name = ?, password = COALESCE(?, password)
      WHERE id = ?
    `;
    connection.query(
      query,
      [first_name, last_name, hashedPassword, userId],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      }
    );
  }
};

module.exports = UserModel;
