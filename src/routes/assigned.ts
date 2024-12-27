import express from "express";
import AssignedController from "../controllers/AssignedController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

/**
 * @swagger
 * /assigned/add:
 *   post:
 *     tags:
 *       - Assigned
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               board_id:
 *                 type: string
 *               creator_id:
 *                 type: number
 *               email_user:
 *                 type: string
 *               role:
 *                 type: string
 *               path_link_confirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sent invitation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sent invitation
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Error adding user to board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error adding user to board
 */
router.post("/add", authMiddleware, AssignedController.addUserToBoard);

/**
 * @swagger
 * /assigned/confirm:
 *   post:
 *     tags:
 *       - Assigned
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               board_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: User confirmed to board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User confirmed to board
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Error confirming user to board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error confirming user to board
 */
router.post("/confirm", authMiddleware, AssignedController.confirmUserToBoard);

export default router;
