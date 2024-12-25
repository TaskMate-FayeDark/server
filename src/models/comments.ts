import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import User from "./users";
import Card from "./cards";

interface CommentAttributes {
  id: string;
  content: object;
  user_id: number;
  card_id: string;
  created: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: string;
  public content!: object;
  public user_id!: number;
  public created!: Date;
  public card_id!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSON,
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
    created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: false,
  }
);
