import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/config";

interface UsersAttributes {
    id: number;
    name: string;
    email: string,
    password: string;
    profile_picture: string;
    created_at: Date;
}

interface UsersCreationAttributes extends Optional<UsersAttributes, "id"> {}

class User extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public profile_picture!: string;
    public created_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false
    }
)

export default User;
