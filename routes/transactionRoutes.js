const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Process a transaction for the authenticated user
 *     description: Performs a transaction for the user based on the service code provided in the request body. Requires JWT token for authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: "PULSA"
 *     responses:
 *       200:
 *         description: Transaction successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Transaksi berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: "INV17082023-001"
 *                     service_code:
 *                       type: string
 *                       example: "PULSA"
 *                     service_name:
 *                       type: string
 *                       example: "Pulsa"
 *                     transaction_type:
 *                       type: string
 *                       example: "PAYMENT"
 *                     total_amount:
 *                       type: number
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-17T10:10:10.000Z"
 *       400:
 *         description: Invalid request or insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Service atau Layanan tidak ditemukan"
 *                 data:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   example: null
 */

// Route to handle transaction requests
router.post('/transaction', authMiddleware.verifyToken, transactionController.transaction);

module.exports = router;
