import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import CheckList from "./checklists";

interface ChecklistItemsAttributes {
  id: string;
  content: object;
  is_completed: boolean;
  checklist_id: string;
}

interface ChecklistItemCreationAttributes
  extends Optional<ChecklistItemsAttributes, "id"> {}

class CheckListItems
  extends Model<ChecklistItemsAttributes, ChecklistItemCreationAttributes>
  implements ChecklistItemsAttributes
{
  public id!: string;
  public content!: object;
  public is_completed!: boolean;
  public checklist_id!: string;
}

CheckListItems.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    checklist_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: CheckList,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "checklist_items",
    timestamps: false,
  }
);
