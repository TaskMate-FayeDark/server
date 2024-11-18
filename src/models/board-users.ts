import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/config";

interface BoardUserAttributes {
    board_id: string;
    user_id: number;
    role: string;
    added_ad: Date,
}

interface BoardUserCreateAttributes extends Optional<BoardUserAttributes, "added_ad"> {}

class BoardUser extends Model<BoardUserAttributes, BoardUserCreateAttributes> implements BoardUserAttributes {
    public board_id!: string;
    public user_id!: number;
    public role!: string;
    public added_ad!: Date;
}

BoardUser.init(
    {
        board_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        added_ad: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "board_users",
        timestamps: false,
    }
)