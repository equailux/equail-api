import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Action extends Model<InferAttributes<Action>, InferCreationAttributes<Action>> {
    declare id: CreationOptional<number>
    declare input: number
    declare delay: number
    declare duration: number
    declare actuatorId: number
    declare thresholdId: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const actionAttributes: ModelAttributes<Action, InferAttributes<Action>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    input: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    delay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actuatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "actuators", key: "id" }
    },
    thresholdId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "thresholds", key: "id" }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

//

const actionOptions = (sequelize: Sequelize): InitOptions<Action> => ({
    sequelize,
    tableName: "actions",
    timestamps: true,
})

//

export { Action, actionAttributes, actionOptions }
