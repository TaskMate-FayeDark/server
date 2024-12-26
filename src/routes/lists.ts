import { Router } from "express";
import ListsController from "../controllers/ListsController";
import authMiddleware from "./../middleware/AuthMiddleware";

const router = Router();

router.get("/get/:board_id", authMiddleware, ListsController.getAllLists);
router.post("/create", authMiddleware, ListsController.createList);
router.put("/update/:id", authMiddleware, ListsController.updateList);
router.delete("/delete/:id", authMiddleware, ListsController.deleteList);

export default router;
/**
 * @swagger
 * /lists/get/{board_id}:
 *   get:
 *     tags:
 *       - Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: board_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The board id
 *     responses:
 *       200:
 *         description: The list of lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: number
 *                   due_date:
 *                     type: string
 *                     format: date-time
 *                   board_id:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /lists/create:
 *   post:
 *     tags:
 *       - Lists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: number
 *               due_date:
 *                 type: string
 *                 format: date-time
 *               board_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: The list was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 position:
 *                   type: number
 *                 due_date:
 *                   type: string
 *                   format: date-time
 *                 board_id:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /lists/update/{id}:
 *   put:
 *     tags:
 *       - Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The list id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: number
 *               due_date:
 *                 type: string
 *                 format: date-time
 *               board_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The list was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 position:
 *                   type: number
 *                 due_date:
 *                   type: string
 *                   format: date-time
 *                 board_id:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: List not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /lists/delete/{id}:
 *   delete:
 *     tags:
 *       - Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The list id
 *     responses:
 *       200:
 *         description: The list was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The list was successfully deleted
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: List not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
