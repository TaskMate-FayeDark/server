import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/config";

interface ChecklistAttributes {
    id: string;
    name: string;
    card_id: string;
    created_at: Date;
}

interface CheckListCreationAttributes extends Optional<ChecklistAttributes, "id"> {}

class CheckList extends Model<ChecklistAttributes, CheckListCreationAttributes> implements ChecklistAttributes {
    public id!: string;
    public name!: string;
    public card_id!: string;
    public created_at!: Date;
}

CheckList.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "checklists",
        timestamps: false,
    }
)