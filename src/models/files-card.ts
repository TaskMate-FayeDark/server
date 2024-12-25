import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import Card from "./cards";

interface FileCardAttributes {
  id: string;
  file: string;
  name: string;
  updated_at: Date;
  card_id: string;
}

interface FileCardCreationAttributes
  extends Optional<FileCardAttributes, "id"> {}

class FileCard
  extends Model<FileCardAttributes, FileCardCreationAttributes>
  implements FileCardAttributes
{
  public id!: string;
  public file!: string;
  public name!: string;
  public updated_at!: Date;
  public card_id!: string;
}

FileCard.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: "files_card",
    timestamps: false,
  }
);
