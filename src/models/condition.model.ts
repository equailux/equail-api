import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Condition extends Model<InferAttributes<Condition>, InferCreationAttributes<Condition>> {
    declare id: CreationOptional<number>
    declare output: number
    declare operator: string
    declare satisfied: boolean
    declare thresholdId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const conditionAttributes: ModelAttributes<Condition, InferAttributes<Condition>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    output: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    operator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    satisfied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

const conditionOptions = (sequelize: Sequelize): InitOptions<Condition> => ({
    sequelize,
    tableName: "conditions",
    timestamps: true,
})

//

export { Condition, conditionAttributes, conditionOptions }
