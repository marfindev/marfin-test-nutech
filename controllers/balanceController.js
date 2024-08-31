const connection = require('../config/db');

exports.getBalance = (req, res) => {
  const email = req.email;
  const query = `SELECT balance FROM balances WHERE user_id = (SELECT id FROM users WHERE email = ?)`;

  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

    res.status(200).json({
      status: 0,
      message: 'Get Balance Berhasil',
      data: { balance: results[0].balance }
    });
  });
};
