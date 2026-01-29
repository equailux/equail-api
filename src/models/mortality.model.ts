import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Mortality extends Model<InferAttributes<Mortality>, InferCreationAttributes<Mortality>> {
    declare id: CreationOptional<number>
    declare count: number
    declare date: Date
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const mortalityAttributes: ModelAttributes<Mortality, InferAttributes<Mortality>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
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

const mortalityOptions = (sequelize: Sequelize): InitOptions<Mortality> => ({
    sequelize,
    tableName: "mortalitys",
    timestamps: true,
})

//

export { Mortality, mortalityAttributes, mortalityOptions }
