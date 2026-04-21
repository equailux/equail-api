import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Reading extends Model<InferAttributes<Reading>, InferCreationAttributes<Reading>> {
    declare id: CreationOptional<number>
    declare name: string
    declare unit: CreationOptional<string>
    declare value: number
    declare sensorId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const readingAttributes: ModelAttributes<Reading, InferAttributes<Reading>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sensorId: {
        type: DataTypes.STRING,
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

const readingOptions = (sequelize: Sequelize): InitOptions<Reading> => ({
    sequelize,
    tableName: "readings",
    timestamps: true,
})

//

export { Reading, readingAttributes, readingOptions }
