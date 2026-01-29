import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Egg extends Model<InferAttributes<Egg>, InferCreationAttributes<Egg>> {
    declare id: CreationOptional<number>
    declare count: number
    declare image: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const eggAttributes: ModelAttributes<Egg, InferAttributes<Egg>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
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

const eggOptions = (sequelize: Sequelize): InitOptions<Egg> => ({
    sequelize,
    tableName: "eggs",
    timestamps: true,
})

//

export { Egg, eggAttributes, eggOptions }
