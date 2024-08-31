const express = require('express');
const topupController = require('../controllers/topupController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Top up the balance of the authenticated user
 *     description: Adds a specified amount to the user's balance based on the JWT token provided in the request header.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: number
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Top Up successful
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
 *                   example: "Top Up Balance berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 2000000
 *       400:
 *         description: Invalid request parameters
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
 *                   example: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
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

// Route to handle top-up requests
router.post('/topup', authMiddleware.verifyToken, topupController.topUp);

module.exports = router;
