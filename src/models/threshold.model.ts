import { ThresholdOp } from "@/schemas/threshold.schema.js"
import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Threshold extends Model<InferAttributes<Threshold>, InferCreationAttributes<Threshold>> {
    declare id: CreationOptional<number>
    declare name: string
    declare icon: string
    declare value: number
    declare message: string
    declare operator: ThresholdOp
    declare activated: boolean
    declare sensorId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const thresholdAttributes: ModelAttributes<Threshold, InferAttributes<Threshold>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    operator: {
        type: DataTypes.ENUM(...ThresholdOp),
        allowNull: false,
    },
    activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "sensors", key: "id" }
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

const thresholdOptions = (sequelize: Sequelize): InitOptions<Threshold> => ({
    sequelize,
    tableName: "thresholds",
    timestamps: true,
})

//

export { Threshold, thresholdAttributes, thresholdOptions }
