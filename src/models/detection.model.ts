import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Detection extends Model<InferAttributes<Detection>, InferCreationAttributes<Detection>> {
    declare id: CreationOptional<number>
    declare x: number
    declare y: number
    declare w: number
    declare h: number
    declare label: string
    declare confidence: number
    declare captureId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const detectionAttributes: ModelAttributes<Detection, InferAttributes<Detection>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    x: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    y: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    w: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    h: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confidence: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    captureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { key: "id", model: "captures" },
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

const detectionOptions = (sequelize: Sequelize): InitOptions<Detection> => ({
    sequelize,
    tableName: "detections",
    timestamps: true,
})

//

export { Detection, detectionAttributes, detectionOptions }
