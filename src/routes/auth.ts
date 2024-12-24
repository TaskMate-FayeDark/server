import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Successfully created users"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       password:
 *                         type: string
 *                         example: password_hash
 *                       profile_picture:
 *                         type: string
 *                         example: "https://www.image/com/picture"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *       400:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This email has been registered"
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Server error"
 *                statusCode:
 *                  type: number
 *                  example: 500
 */
router.post('/register', AuthController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   example:
 *                     id: 0
 *                     name: string
 *                     email: string
 *                     password: string
 *                     profile_picture: string
 *                     create_at: "2024-11-15T08:54:50.840Z"
 *                 token:
 *                   type: string
 *                   example: token user
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This account does not exist"
 *                 statusCode:
 *                   type: number
 *                   example: 401
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error!"
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *
 *
 */
router.post('/login', AuthController.login)

router.post('/send-reset-code', AuthController.sendResetCode)
router.post('/reset-password', AuthController.resetPassword)

export default router;
