import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Capture extends Model<InferAttributes<Capture>, InferCreationAttributes<Capture>> {
    declare id: CreationOptional<number>
    declare eggs: number
    declare image: string
    declare camera: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const eggAttributes: ModelAttributes<Capture, InferAttributes<Capture>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    eggs: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    camera: {
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

const eggOptions = (sequelize: Sequelize): InitOptions<Capture> => ({
    sequelize,
    tableName: "eggs",
    timestamps: true,
})

//

export { Capture, eggAttributes, eggOptions }
