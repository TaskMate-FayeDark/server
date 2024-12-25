import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/config";
import User from "./users";

interface passResetCodeAttributes {
  id: number;
  user_id: number;
  code: string;
  expiry_time: Date;
}

interface passResetCodeCreationAttributes
  extends Optional<passResetCodeAttributes, "id"> {}

class PasswordResetCode
  extends Model<passResetCodeAttributes, passResetCodeCreationAttributes>
  implements passResetCodeAttributes
{
  public id!: number;
  public user_id!: number;
  public code!: string;
  public expiry_time!: Date;
}

PasswordResetCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "password_reset_codes",
    timestamps: false,
  }
);

export default PasswordResetCode;
