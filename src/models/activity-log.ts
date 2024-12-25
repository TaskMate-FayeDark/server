import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/config";
import User from "./users";
import Board from "./boards";
import Card from "./cards";

interface activityLogAttributes {
  id: string;
  description: string;
  user_id: number;
  board_id: string;
  card_id: string;
  created_at: Date;
}

interface activityLogCreationAttributes
  extends Optional<activityLogAttributes, "id"> {}

class ActivityLog
  extends Model<activityLogAttributes, activityLogCreationAttributes>
  implements activityLogAttributes
{
  public id!: string;
  public description!: string;
  public user_id!: number;
  public board_id!: string;
  public card_id!: string;
  public created_at!: Date;
}

ActivityLog.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    board_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Board,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Card,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "activity_log",
    timestamps: false,
  }
);
