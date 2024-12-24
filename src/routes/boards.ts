import express from "express";
import BoardsController from "../controllers/BoardsController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

/**
 * @swagger
 * /boards/{userId}/:
 *   get:
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: "ID user in board"
 *     responses:
 *       200:
 *         description: Getting boards
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Getting boards"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user1b1
 *                       name:
 *                         type: string
 *                         example: "Task Mate"
 *                       description:
 *                         type: string
 *                         example: "description here"
 *                       viewing_rights:
 *                         type: string
 *                         example: every one
 *                       created_by:
 *                         type: number
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         example: "2024-11-15T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         example: "2024-11-15T12:00:00Z"
 *                       due_date:
 *                         type: sting
 *                         example: "2024-11-15T12:00:00Z"
 *       401:
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Token
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
 */
router.get("/:userId", authMiddleware, BoardsController.getAllBoards);

/**
 * @swagger
 * /boards/create:
 *   post:
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               viewing_rights:
 *                 type: string
 *                 example: "private || public"
 *               created_by:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Created board
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Created boards"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user1b1
 *                       name:
 *                         type: string
 *                         example: "Task Mate"
 *                       description:
 *                         type: string
 *                         example: "description here"
 *                       viewing_rights:
 *                         type: string
 *                         example: every one
 *                       created_by:
 *                         type: number
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       due_date:
 *                         type: sting
 *                         example: "2024-11-15T12:00:00Z"
 *       401:
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Token
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
 */
router.post("/create", authMiddleware, BoardsController.createBoard);

/**
 * @swagger
 * /boards/{boardId}:
 *   get:
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: path
 *           name: boardId
 *           required: true
 *           schema:
 *             type: string
 *           description: "ID of the board to retrieve"
 *     responses:
 *       200:
 *         description: Getting board
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Getting board"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user1b1
 *                       name:
 *                         type: string
 *                         example: "Task Mate"
 *                       description:
 *                         type: string
 *                         example: "description here"
 *                       viewing_rights:
 *                         type: string
 *                         example: every one
 *                       created_by:
 *                         type: number
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       due_date:
 *                         type: sting
 *                         example: "2024-11-15T12:00:00Z"
 *       401:
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Token
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
 */
router.get(`/`, authMiddleware, BoardsController.getBoardById);

/**
 * @swagger
 * /boards/update/{boardId}:
 *   put:
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: path
 *           name: boardId
 *           required: true
 *           schema:
 *             type: string
 *           description: "ID of the board to retrieve"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated boards
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Updated boards"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user1b1
 *                       name:
 *                         type: string
 *                         example: "Task Mate"
 *                       description:
 *                         type: string
 *                         example: "description here"
 *                       viewing_rights:
 *                         type: string
 *                         example: every one
 *                       created_by:
 *                         type: number
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       due_date:
 *                         type: sting
 *                         example: "2024-11-15T12:00:00Z"
 *       401:
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Token
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
 */
router.put("/update/:boardId", authMiddleware, BoardsController.updateBoard);

/**
 * @swagger
 * /boards/delete/{boardId}:
 *   delete:
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         - in: path
 *           name: boardId
 *           required: true
 *           schema:
 *             type: string
 *           description: "ID of the board to retrieve"
 *     responses:
 *       200:
 *         description: Deleted board
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Deleted board"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user1b1
 *                       name:
 *                         type: string
 *                         example: "Task Mate"
 *                       description:
 *                         type: string
 *                         example: "description here"
 *                       viewing_rights:
 *                         type: string
 *                         example: every one
 *                       created_by:
 *                         type: number
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *                       due_date:
 *                         type: sting
 *                         format: date-time
 *                         example: "2024-11-15T12:00:00Z"
 *       401:
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Token
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
 */
router.delete("/delete/:boardId", authMiddleware, BoardsController.deleteBoard);
export default router;
