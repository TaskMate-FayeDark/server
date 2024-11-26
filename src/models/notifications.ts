import {Optional, Model, DataTypes} from "sequelize";
import sequelize from "../config/config";

interface NotificationAttributes {
    id: string;
    is_read: boolean;
    message: string;
    user_id: number;
    created_at: Date;
}

interface NotificationCreatedAttributes extends Optional<NotificationAttributes, "id">{}

class Notification extends Model<NotificationAttributes, NotificationCreatedAttributes> implements NotificationAttributes {
    public id!: string;
    public message!: string;
    public user_id!: number;
    public created_at!: Date;
    public is_read!: boolean;
}

Notification.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "notifications",
        timestamps: false,
    }
)