const express = require('express');
const balanceController = require('../controllers/balanceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Retrieve the balance of the authenticated user
 *     description: Returns the balance for the user based on the JWT token provided in the request header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Balance successful
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
 *                   example: "Get Balance Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1000000
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

// Route to get user balance
router.get('/balance', authMiddleware.verifyToken, balanceController.getBalance);

module.exports = router;
