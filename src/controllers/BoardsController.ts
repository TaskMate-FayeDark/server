import {Response, Request} from "express";
import BoardsService from "../services/BoardsService";

class BoardsController {
    public static async createBoard(req: Request, res: Response): Promise<void> {
        const boardData = req.body;
        const result = await BoardsService.createBoard(boardData);
        if (!result) {
            res.status(500).json({message: "Unexpected error occurred" });
            return;
        }
        if(!result.success) {
            res.status(500).json({message: result.message });
            return;
        }
        res.status(200).json({message: "Created board", data: result.data});
        return;
    }

    public static async deleteBoard(req: Request, res: Response): Promise<void> {
        const boardId = req.params.boardId;
        const result = await BoardsService.deleteBoard(boardId);
        if (!result) {
            res.status(500).json({message: "Unexpected error occurred" });
            return;
        }
        if(!result.success) {
            res.status(500).json({message: result.message});
            return;
        }
        res.status(200).json({message: "Deleted board", data: result.data});
        return;
    }

    public static async updateBoard(req: Request, res: Response): Promise<void> {
        const boardId = req.params.boardId;
        const result = await BoardsService.updateBoard(boardId, req.body);
        if (!result) {
            res.status(500).json({message: "Unexpected error occurred" });
            return;
        }
        if(!result.success) {
            res.status(500).json({message: result.message})
            return;
        }
        res.status(200).json({message: "Updated board", data: result.data});
        return;
    }

    public static async getAllBoards(req: Request,res: Response): Promise<void> {
        const result = await BoardsService.getAllBoards();
        if(!result) {
            res.status(500).json({message: "Unexpected error occurred" });
            return;
        }
        if(!result.success) {
            res.status(500).json({message: result.message});
            return ;
        }
        res.status(200).json({message: "Getting boards", data: result.data});
        return
    }

    public static async getBoardById(req: Request, res: Response): Promise<void> {
        const boardId = req.params.boardId;
        const result = await BoardsService.getBoardById(boardId);
        if (!result) {
            res.status(500).json({message: "Unexpected error occurred" });
            return;
        }
        if(!result.success) {
            res.status(500).json({message: result.message});
            return ;
        }
        res.status(200).json({message: "Getting board", data: result.data});
        return
    }
}

export default BoardsController;