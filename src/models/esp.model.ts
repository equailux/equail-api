import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Esp extends Model<InferAttributes<Esp>, InferCreationAttributes<Esp>> {
    declare id: CreationOptional<number>
    declare tag: string
    declare name: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const espAttributes: ModelAttributes<Esp, InferAttributes<Esp>> = {
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

const espOptions = (sequelize: Sequelize): InitOptions<Esp> => ({
    sequelize,
    tableName: "esps",
    timestamps: true,
})

//

export { Esp, espAttributes, espOptions }
