import {Optional, Model, DataTypes} from "sequelize";
import sequelize from "../config/config";

interface ListsAttributes {
    id: string;
    name: string;
    position: number;
    due_date: Date;
    board_id: string;
    created_at: Date;
    updated_at: Date;
}

interface ListsCreationAttributes extends Optional<ListsAttributes, "id"> {}

class List extends Model<ListsCreationAttributes, ListsCreationAttributes> implements ListsAttributes {
    public id!: string;
    public name!: string;
    public position!: number;
    public due_date!: Date;
    public board_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

List.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        board_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "lists",
        timestamps: false,
    }
)

export default List;