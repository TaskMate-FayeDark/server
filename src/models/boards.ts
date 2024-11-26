import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/config";

export interface BoardAttributes {
    id: string;
    name: string;
    description: string;
    viewing_rights: string;
    created_by: number;
    created_at: Date;
    updated_at: Date;
    due_date: Date;

}

export interface BoardCreationAttributes extends Optional<BoardAttributes, "description"> {}

class Board extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public viewing_rights!: string;
    public due_date!: Date;
    public created_by!: number;
    public created_at!: Date;
    public updated_at!: Date;
}

Board.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        viewing_rights: {
            type: DataTypes.STRING,
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "boards",
        timestamps: false,
    }
)

export default Board;