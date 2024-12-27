import { Request, Response } from "express";
import BoardUser from "../models/board-users";
import Board from "../models/boards";
import { sendEmail } from "../services/NodeMailer";
import dotenv from "dotenv";
import User from "../models/users";

dotenv.config();

class AssignedController {
  public static addUserToBoard = async (req: Request, res: Response) => {
    try {
      const { board_id, creator_id, email_user, role, path_link_confirm } =
        req.body;
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      if (role !== "creator" && role !== "member" && role !== "viewer") {
        res.status(400).json({ message: "Invalid role" });
        return;
      }
      const boardUserAdd = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: req.user.userId,
        },
      });
      if (!boardUserAdd || boardUserAdd.role === "viewer") {
        res.status(403).json({
          message: "You do not have permission to add user to the board.",
        });
        return;
      }
      const findBoard = await Board.findOne({
        where: {
          id: board_id,
          created_by: creator_id,
        },
      });
      if (!findBoard) {
        res.status(404).json({ message: "Board not found" });
        return;
      }
      const findUserInvite = await User.findOne({
        where: {
          id: req.user.userId,
        },
      });
      if (!findUserInvite) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const mailCreator = await User.findOne({
        where: {
          id: creator_id,
        },
      });
      if (!mailCreator) {
        res.status(404).json({ message: "Creator not found" });
        return;
      }
      const findUser = await User.findOne({
        where: {
          email: email_user,
        },
      });
      if (!findUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (findUser.id === req.user.userId) {
        res
          .status(400)
          .json({ message: "You cannot add yourself to the board" });
        return;
      }
      if (findUser.email === mailCreator.email) {
        res
          .status(400)
          .json({ message: "You cannot add the creator of the board" });
        return;
      }
      const checkIsUserInBoard = await BoardUser.findOne({
        where: {
          board_id: board_id,
          user_id: findUser.id,
        },
      });
      if (checkIsUserInBoard) {
        res.status(400).json({ message: "User already in board" });
        return;
      }
      const propsEmail = {
        to: email_user,
        subject: "Invitation to board",
        text: `You have been invited to the board ${findBoard.name} by ${
          findUserInvite.name
        }. Click the link to confirm: ${
          process.env.LINK_CONFIRM_ASSIGN_BOARD + path_link_confirm
        }`,
      };
      await sendEmail(propsEmail.to, propsEmail.subject, propsEmail.text);
      await BoardUser.create({
        board_id: board_id,
        user_id: findUser.id,
        role,
        added_at: new Date(),
        is_assign: false,
      });
      res.status(201).json({ message: "Sent invitation" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error adding user to board", error });
      return;
    }
  };

  public static confirmUserToBoard = async (req: Request, res: Response) => {
    try {
      const { user_id, board_id } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      if (user_id !== req.user.userId) {
        res.status(403).json({
          message:
            "You do not have permission to confirm the user to the board.",
        });
        return;
      }
      const findBoard = await BoardUser.findOne({
        where: {
          board_id: board_id,
        },
      });
      if (!findBoard) {
        res.status(404).json({ message: "Board not found" });
        return;
      }
      if (findBoard.is_assign) {
        res.status(400).json({ message: "User already confirmed" });
        return;
      }
      await BoardUser.update(
        { is_assign: true },
        {
          where: {
            user_id: user_id,
            board_id: board_id,
          },
        }
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error confirming user to board", error });
      return;
    }
  };
}

export default AssignedController;
