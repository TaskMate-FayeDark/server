import Board from "../models/boards";

class BoardsService {
    public static async getAllBoards () {
        try {
            const boards = await Board.findAll()
            return {success: true, data: boards};
        }
        catch (error) {
            if(error instanceof Error) {
                return {success: false, message: error.message};
            }
        }
    }

    public static async getBoardById (boardId: string) {
        try {
            const board = await Board.findOne({where: {id: boardId}})
            return {success: true, data: board};
        }
        catch (error) {
            if(error instanceof Error) {
                return {success: false, message: error.message};
            }
        }
    }

    public static async createBoard (boardData: Board) {
        try {
            const newBoard = await Board.create(boardData)
            return {success: true, data: newBoard};
        }
        catch (error) {
            if(error instanceof Error) {
                return {success: false, message: error.message};
            }
        }
    }

    public static async updateBoard (boardId: string, newBoard: Board) {
        try {
            const boardUpdate = await Board.findOne({
                where: {
                    id: boardId
                }
            });
            if(!boardUpdate) {
                return {success: false, message: "The table you need to update was not found!"};
            }
            await boardUpdate.update(newBoard);
            return {success: true, data: boardUpdate};
        }
        catch (error) {
            if(error instanceof Error) {
                return {success: false, message: error.message};
            }
        }
    }

    public static async deleteBoard (boardId: string) {
        try {
            const board = await Board.findOne({
                where: {
                    id: boardId
                }
            })
            if(!board) {
                return {success:false, message: "The table you want to delete cannot be found!"}
            }
            await board.destroy();
            return {success: true, data: board};
        }
        catch (error) {
            if(error instanceof Error) {
                return {success: false, message: error.message};
            }
        }
    }
}

export default BoardsService;