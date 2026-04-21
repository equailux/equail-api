import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Sensor extends Model<InferAttributes<Sensor>, InferCreationAttributes<Sensor>> {
    declare id: CreationOptional<number>
    declare tag: string
    declare name: string
    declare espId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const sensorAttributes: ModelAttributes<Sensor, InferAttributes<Sensor>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tag: {
        type: DataTypes.STRING,
        unique: "tag",
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    espId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "esps", key: "id" }
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

const sensorOptions = (sequelize: Sequelize): InitOptions<Sensor> => ({
    sequelize,
    tableName: "sensors",
    timestamps: true,
})

//

export { Sensor, sensorAttributes, sensorOptions }
