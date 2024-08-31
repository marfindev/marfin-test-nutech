const connection = require('../config/db');

exports.topUp = (req, res) => {
  const { top_up_amount } = req.body;

  if (isNaN(top_up_amount) || top_up_amount <= 0) {
    return res.status(400).json({
      status: 102,
      message: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
      data: null
    });
  }

  const email = req.email;
  const query = `
    UPDATE balances SET balance = balance + ? WHERE user_id = (SELECT id FROM users WHERE email = ?);
    INSERT INTO transactions (user_id, transaction_type, amount) VALUES ((SELECT id FROM users WHERE email = ?), 'TOPUP', ?);
  `;

  connection.query(query, [top_up_amount, email, email, top_up_amount], (err, result) => {
    if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

    connection.query(`SELECT balance FROM balances WHERE user_id = (SELECT id FROM users WHERE email = ?)`, [email], (err, results) => {
      if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

      res.status(200).json({
        status: 0,
        message: 'Top Up Balance berhasil',
        data: { balance: results[0].balance }
      });
    });
  });
};
