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
    declare image: string
    declare camera: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const captureAttributes: ModelAttributes<Capture, InferAttributes<Capture>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

const captureOptions = (sequelize: Sequelize): InitOptions<Capture> => ({
    sequelize,
    tableName: "captures",
    timestamps: true,
})

//

export { Capture, captureAttributes, captureOptions }
