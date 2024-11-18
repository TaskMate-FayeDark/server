import {DataTypes, Optional, Model} from "sequelize";
import sequelize from "../config/config";

interface CardLabelAttributes {
    card_id: string;
    label_id: string;
}

interface CardLabelCreationAttributes extends Optional<CardLabelAttributes, "label_id">{}

class CardLabel extends Model<CardLabelAttributes, CardLabelCreationAttributes> implements CardLabelAttributes{
    public card_id!: string;
    public label_id!: string;
}

CardLabel.init(
    {
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        label_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "card_labels",
        timestamps: false,
    }
)