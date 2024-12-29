import { Request, Response } from "express";
import List from "../models/lists";
import BoardUser from "../models/board-users";
import { v4 as uuidv4 } from "uuid";

class ListController {
  public static async getAllLists(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const board_id = req.params.board_id;
      const checkRole = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: req.user.userId,
        },
      });
      if (!checkRole) {
        res
          .status(403)
          .json({ message: "You are not allowed to view this board" });
        return;
      }
      const lists = await List.findAll({
        where: {
          board_id: board_id,
        },
        order: [["position", "ASC"]],
      });
      res.status(200).json(lists);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching lists", error });
      return;
    }
  }

  public static async createList(req: Request, res: Response): Promise<void> {
    try {
      const { name, due_date, board_id } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const checkRole = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: req.user.userId,
        },
      });
      if (!checkRole || checkRole.role === "viewer") {
        res
          .status(403)
          .json({ message: "You do not have permission to create the list." });
        return;
      }
      const maxPosition: number = (await List.max("position", {
        where: {
          board_id: board_id,
        },
      })) as number;
      const newList = await List.create({
        id: uuidv4(),
        name,
        position: maxPosition + 1 || 1,
        due_date,
        board_id,
        created_at: new Date(),
        updated_at: new Date(),
      });
      res.status(201).json({
        message: "List created successfully",
        data: newList,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating list", error });
    }
  }

  public static async updateList(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, position, due_date, board_id } = req.body;

      const list = await List.findByPk(id);
      if (!list) {
        res.status(404).json({ message: "List not found" });
        return;
      }
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const checkRole = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: req.user.userId,
        },
      });
      if (!checkRole || checkRole.role === "viewer") {
        res
          .status(403)
          .json({ message: "You do not have permission to update the list." });
        return;
      }
      const currentListPosition = list.position;
      if (position !== currentListPosition) {
        const lists = await List.findAll({
          where: {
            board_id: board_id,
          },
        });
        for (let i = position; i > currentListPosition; i--) {
          const list = lists.find((list) => list.position === i);
          if (list) {
            await list.update({
              position: i - 1,
              updated_at: new Date(),
            });
          }
        }
      }
      await list.update({
        name: name || list.name,
        position: position || list.position,
        due_date: due_date || list.due_date,
        board_id: board_id || list.board_id,
        updated_at: new Date(),
      });

      res.status(200).json({
        message: "List updated successfully",
        data: list,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating list", error });
    }
  }

  public static async deleteList(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const board_id = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const checkRole = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: req.user.userId,
        },
      });
      if (!checkRole || checkRole.role === "viewer") {
        res
          .status(403)
          .json({ message: "You do not have permission to delete the list." });
        return;
      }
      const list = await List.findByPk(id);
      const allList = await List.findAll();
      if (!list) {
        res.status(404).json({ message: "List not found" });
        return;
      }
      const currentListPosition = list.position;
      for (let i = 1; i <= currentListPosition; i++) {
        if (allList[i].position === currentListPosition) {
          const j = i + 1;
          allList[j].update({
            position: allList[j].position - 1,
            updated_at: new Date(),
          });
        }
      }
      await list.destroy();
      res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting list", error });
    }
  }
}

export default ListController;
