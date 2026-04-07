import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare id: string
    declare accountId: string
    declare providerId: string
    declare userId: string
    declare password: CreationOptional<string>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

const accountAttributes: ModelAttributes<Account, InferAttributes<Account>> = {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    accountId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    providerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true,
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

const accountOptions = (sequelize: Sequelize): InitOptions<Account> => ({
    sequelize,
    tableName: "account",
    timestamps: true,
})

//

export { Account, accountAttributes, accountOptions }
