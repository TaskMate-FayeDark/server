import { DataTypes, Optional, Model } from "sequelize";
import sequelize from "../config/config";
import Card from "./cards";
import Label from "./labels";

interface CardLabelAttributes {
  card_id: string;
  label_id: string;
}

interface CardLabelCreationAttributes
  extends Optional<CardLabelAttributes, "label_id"> {}

class CardLabel
  extends Model<CardLabelAttributes, CardLabelCreationAttributes>
  implements CardLabelAttributes
{
  public card_id!: string;
  public label_id!: string;
}

CardLabel.init(
  {
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
    label_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Label,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "card_labels",
    timestamps: false,
  }
);
