import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/config";
import Board from "./boards";
import User from "./users";
interface BoardUserAttributes {
    id: number;
    board_id: string;
    user_id: number;
    role: string;
    added_at: Date;
}

interface BoardUserCreateAttributes
    extends Optional<BoardUserAttributes, "id"> {}

class BoardUser
    extends Model<BoardUserAttributes, BoardUserCreateAttributes>
    implements BoardUserAttributes
{
    public id!: number;
    public board_id!: string;
    public user_id!: number;
    public role!: string;
    public added_at!: Date;
}

BoardUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        added_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "board_users",
        timestamps: false,
    }
);

export default BoardUser;
