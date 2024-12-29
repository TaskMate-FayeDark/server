import { Request, Response } from "express";
import Notification from "../models/notifications";
import { v4 as uuidv4 } from "uuid";

class NotificationController {
  public static async getAllNotifications(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const notifications = await Notification.findAll();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }

  public static async getNotificationById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const notification = await Notification.findByPk(id);
      if (notification) {
        res.status(200).json(notification);
      } else {
        res.status(404).json({ error: "Notification not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notification" });
    }
  }

  public static async createNotification(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { name, message, user_id } = req.body;
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const dataAdd = {
        id: uuidv4(),
        name,
        message,
        user_id,
        created_at: new Date(),
        is_read: false,
      };
      const newNotification = await Notification.create(dataAdd);
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ error: "Failed to create notification" });
    }
  }

  public static async updateNotificationById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, message, is_read } = req.body;

      const notification = await Notification.findByPk(id);
      if (!notification) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      if (notification.user_id !== req.user.userId) {
        res
          .status(403)
          .json({
            error: "You do not have permission to update the notification",
          });
        return;
      }
      notification.name = name || notification.name;
      notification.message = message || notification.message;
      notification.is_read =
        is_read !== undefined ? is_read : notification.is_read;

      await notification.save();

      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: "Failed to update notification" });
    }
  }

  public static async deleteNotificationById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await Notification.destroy({ where: { id } });
      if (deleted) {
        res.status(200).json({ message: "Notification deleted successfully" });
      } else {
        res.status(404).json({ error: "Notification not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notification" });
    }
  }
}

export default NotificationController;
