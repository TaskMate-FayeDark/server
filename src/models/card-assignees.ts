import {DataTypes, Optional, Model} from "sequelize";
import sequelize from "../config/config";

interface CardAssigneesAttributes {
    card_id: string;
    user_id: number;
    assigned_at: Date;
}

interface CardAssigneesCreationAttributes extends Optional<CardAssigneesAttributes, "assigned_at"> {}

class CardAssignees extends Model<CardAssigneesAttributes, CardAssigneesCreationAttributes> implements CardAssigneesAttributes {
    public card_id!: string;
    public user_id!: number;
    public assigned_at!: Date;
}

CardAssignees.init(
    {
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        assigned_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "card_assignees",
        timestamps: false,
    }
)