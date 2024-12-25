import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import Board from "./boards";

interface LabelAttributes {
  id: string;
  name: string;
  color: string;
  board_id: string;
}

interface LabelCreationAttributes extends Optional<LabelAttributes, "id"> {}

class Label
  extends Model<LabelAttributes, LabelCreationAttributes>
  implements LabelAttributes
{
  public id!: string;
  public name!: string;
  public color!: string;
  public board_id!: string;
}

Label.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "labels",
    timestamps: false,
  }
);

export default Label;
