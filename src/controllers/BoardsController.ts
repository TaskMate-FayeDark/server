import { Response, Request } from "express";
import BoardsService from "../services/BoardsService";
import BoardUser from "../models/board-users";
class BoardsController {
  public static async createBoard(req: Request, res: Response): Promise<void> {
    const boardData = req.body;
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!boardData.name || !boardData.viewing_rights) {
      res.status(400).json({
        message: "Do not leave name and privacy information blank!",
      });
      return;
    }
    if (
      boardData.viewing_rights !== "private" &&
      boardData.viewing_rights !== "public"
    ) {
      res.status(500).json({ message: "Wrong privacy format" });
      return;
    }
    const userId = req.user.userId;
    if (userId !== parseInt(boardData.created_by)) {
      res.status(500).json({ message: "Unexpected error!" });
      return;
    }
    const result = await BoardsService.createBoard(boardData, userId);
    if (!result) {
      res.status(500).json({ message: "Unexpected error occurred" });
      return;
    }
    if (!result.success) {
      res.status(500).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: "Created board", data: result.data });
    return;
  }

  public static async deleteBoard(req: Request, res: Response): Promise<void> {
    const boardId = req.params.boardId;
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user.userId;
    const boardData = await BoardsService.getBoardById(boardId, userId);
    const searchedBoardUser = await BoardUser.findOne({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });
    if (!boardData) {
      res.status(404).json({ message: "Board not found" });
      return;
    }
    if (
      !boardData.success &&
      boardData.data &&
      userId !== boardData.data.created_by
    ) {
      res.status(500).json({ message: "Unexpected error!" });
      return;
    }
    if (searchedBoardUser && searchedBoardUser.role !== "creator") {
      res.status(500).json({
        message: "You are not allowed to delete this table.",
      });
      return;
    }
    const result = await BoardsService.deleteBoard(boardId, userId);
    if (!result) {
      res.status(500).json({ message: "Unexpected error occurred" });
      return;
    }
    if (!result.success) {
      res.status(500).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: "Deleted board", data: result.data });
    return;
  }

  public static async updateBoard(req: Request, res: Response): Promise<void> {
    const boardId = req.params.boardId;
    const boardData = req.body;
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user.userId;
    const searchedBoardUser = await BoardUser.findOne({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });
    if (
      !boardData.success &&
      boardData.data &&
      userId !== boardData.data.created_by
    ) {
      res.status(500).json({ message: "Unexpected error!" });
      return;
    }
    if (searchedBoardUser && searchedBoardUser.role !== "creator") {
      res.status(500).json({
        message: "You are not allowed to update this table.",
      });
      return;
    }
    const result = await BoardsService.updateBoard(boardId, boardData, userId);
    if (!result) {
      res.status(500).json({ message: "Unexpected error occurred" });
      return;
    }
    if (!result.success) {
      res.status(500).json({ message: result.message });
      return;
    }
    res.status(200).json({ message: "Updated board", data: result.data });
    return;
  }

  public static async getAllBoards(req: Request, res: Response): Promise<void> {
    const userId: number = parseInt(req.params.userId);
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const offset = (page - 1) * limit;
    if (userId === undefined) {
      res.status(400).json({ message: "User id is required" });
      return;
    }
    if (!req.user) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }
    if (userId !== req.user.userId) {
      res.status(403).json({
        message: "You are not allowed to view this user's boards",
      });
      return;
    }
    const searchedBoardUser = await BoardUser.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!searchedBoardUser || searchedBoardUser.length === 0) {
      res.status(404).json({ message: "No board found for this user" });
      return;
    }

    const boardIds = searchedBoardUser.map((boardUser) => boardUser.board_id);
    const result = await BoardsService.getAllBoards(
      limit,
      offset,
      boardIds,
      userId
    );
    if (!result) {
      res.status(500).json({ message: "Unexpected error occurred" });
      return;
    }
    if (!result.success) {
      res.status(500).json({ message: result.message });
      return;
    }
    res.status(200).json({
      message: "Getting boards",
      data: result.data,
      total: result.total,
    });
    return;
  }

  public static async getBoardById(req: Request, res: Response): Promise<void> {
    const boardId = req.query.boardId as string;
    if (!req.user) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }
    const userId = req.user.userId;
    const result = await BoardsService.getBoardById(boardId, userId);
    if (!result) {
      res.status(500).json({ message: "Unexpected error occurred" });
      return;
    }
    if (!result.success) {
      res.status(500).json({ message: result.message });
      return;
    }
    res.status(200).json({
      message: "Getting board",
      data: result.data,
      member: result.member,
    });
    return;
  }
}

export default BoardsController;
