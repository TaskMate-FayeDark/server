import { DataTypes, Optional, Model } from "sequelize";
import sequelize from "../config/config";
import List from "./lists";

interface CardAttributes {
  id: string;
  title: string;
  description: string;
  position: number;
  due_date: Date;
  list_id: string;
  created_at: Date;
  updated_at: Date;
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public position!: number;
  public due_date!: Date;
  public list_id!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Card.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    list_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: List,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "cards",
    timestamps: false,
  }
);

export default Card;
