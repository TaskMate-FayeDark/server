import Board from "../models/boards";
import BoardUser from "../models/board-users";
import User from "../models/users";

// Ensure associations are defined
Board.belongsTo(User, { foreignKey: "created_by", as: "createdByUser" });
class BoardsService {
  public static async getAllBoards(
    limit: number,
    offset: number,
    boardIds: string[] | string,
    id_viewer: number
  ) {
    try {
      const boards = await Board.findAll({
        where: {
          id: Array.isArray(boardIds) ? boardIds : [boardIds],
        },
        include: [
          {
            model: User,
            as: "createdByUser",
            attributes: ["name", "profile_picture"],
          },
        ],
        limit: limit,
        offset: offset,
      });

      const totalData = await BoardUser.count({
        where: {
          user_id: id_viewer,
        },
      });

      return { success: true, data: boards, total: totalData };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }

  public static async getBoardById(boardId: string) {
    try {
      const board = await Board.findOne({
        where: { id: boardId },
        include: [
          {
            model: User,
            as: "createdByUser",
            attributes: ["name", "profile_picture"],
          },
        ],
      });
      const memberBoard = await BoardUser.findAll({
        where: {
          board_id: boardId,
        },
      });
      const idMember = memberBoard
        .filter((board) => board.role !== "creator")
        .map((board) => board.user_id);
      const infoMember = await User.findAll({
        where: {
          id: idMember,
        },
      });
      return { success: true, data: board, member: infoMember };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }

  public static async createBoard(boardData: Board, userId: number) {
    try {
      const newBoard = await Board.create(boardData);
      const newBoardUser = {
        board_id: newBoard.id,
        user_id: userId,
        role: "creator",
        added_at: new Date(),
      };
      await BoardUser.create(newBoardUser);
      return { success: true, data: newBoard };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }

  public static async updateBoard(
    boardId: string,
    newBoard: Board,
    userId: number
  ) {
    try {
      const boardUpdate = await Board.findOne({
        where: {
          id: boardId,
          created_by: userId,
        },
      });
      if (!boardUpdate) {
        return {
          success: false,
          message: "The table you need to update was not found!",
        };
      }
      await boardUpdate.update(newBoard);
      return { success: true, data: boardUpdate };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }

  public static async deleteBoard(boardId: string, userId: number) {
    try {
      const board = await Board.findOne({
        where: {
          id: boardId,
          created_by: userId,
        },
      });
      if (!board) {
        return {
          success: false,
          message: "The table you want to delete cannot be found!",
        };
      }
      await board.destroy();
      return { success: true, data: board };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  }
}

export default BoardsService;
