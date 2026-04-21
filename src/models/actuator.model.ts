import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Actuator extends Model<InferAttributes<Actuator>, InferCreationAttributes<Actuator>> {
    declare id: CreationOptional<number>
    declare tag: string
    declare name: string
    declare espId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const actuatorAttributes: ModelAttributes<Actuator, InferAttributes<Actuator>> = {
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
        references: { model: "esp", key: "id" }
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

const actuatorOptions = (sequelize: Sequelize): InitOptions<Actuator> => ({
    sequelize,
    tableName: "actuators",
    timestamps: true,
})

//

export { Actuator, actuatorAttributes, actuatorOptions }
