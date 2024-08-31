const connection = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.transaction = (req, res) => {
  const { service_code } = req.body;
  const email = req.email;

  // Service validation (for this example, we'll assume a static list of valid services)
  const validServices = {
    'PULSA': { name: 'Pulsa', amount: 10000 },
    'GAME_VOUCHER': { name: 'Game Voucher', amount: 50000 },
    // Add more services as needed
  };

  const service = validServices[service_code];
  if (!service) {
    return res.status(400).json({
      status: 102,
      message: 'Service atau Layanan tidak ditemukan',
      data: null
    });
  }

  // Get user balance
  const balanceQuery = `SELECT id, balance FROM balances WHERE user_id = (SELECT id FROM users WHERE email = ?)`;
  connection.query(balanceQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

    const userBalance = results[0]?.balance;
    const userId = results[0]?.id;

    if (userBalance === undefined || userId === undefined) {
      return res.status(400).json({
        status: 102,
        message: 'User tidak ditemukan',
        data: null
      });
    }

    // Check if balance is sufficient
    if (userBalance < service.amount) {
      return res.status(400).json({
        status: 102,
        message: 'Saldo tidak mencukupi',
        data: null
      });
    }

    // Deduct the service amount from the user's balance
    const transactionQuery = `
      UPDATE balances SET balance = balance - ? WHERE user_id = ?;
      INSERT INTO transactions (user_id, transaction_type, amount, service_code, invoice_number) 
      VALUES (?, 'PAYMENT', ?, ?, ?);
    `;

    const invoiceNumber = `INV${new Date().getTime()}-${uuidv4().slice(0, 6).toUpperCase()}`;

    connection.query(
      transactionQuery,
      [service.amount, userId, userId, service.amount, service_code, invoiceNumber],
      (err) => {
        if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

        res.status(200).json({
          status: 0,
          message: 'Transaksi berhasil',
          data: {
            invoice_number: invoiceNumber,
            service_code: service_code,
            service_name: service.name,
            transaction_type: 'PAYMENT',
            total_amount: service.amount,
            created_on: new Date().toISOString()
          }
        });
      }
    );
  });
};
