const bcrypt = require('bcryptjs');
const connection = require('../config/db');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 102,
      message: 'Paramter email tidak sesuai format',
      data: null
    });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({
      status: 102,
      message: 'Password harus minimal 8 karakter',
      data: null
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)`;
  connection.query(query, [email, first_name, last_name, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });

    res.status(200).json({
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null
    });
  });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: 'Paramter email tidak sesuai format',
        data: null
      });
    }
  
    const query = `SELECT * FROM users WHERE email = ?`;
    connection.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ status: 500, message: 'Server error', data: null });
  
      if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
        return res.status(401).json({
          status: 103,
          message: 'Username atau password salah',
          data: null
        });
      }
  
      const token = jwt.sign({ email: results[0].email }, process.env.JWT_SECRET, {
        expiresIn: '12h'
      });
  
      res.status(200).json({
        status: 0,
        message: 'Login Sukses',
        data: { token }
      });
    });
  };