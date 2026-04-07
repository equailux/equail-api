import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    declare id: string
    declare token: string
    declare ipAddress: CreationOptional<string>
    declare userAgent: CreationOptional<string>
    declare userId: string
    declare expiresAt: Date
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

const sessionAttributes: ModelAttributes<Session, InferAttributes<Session>> = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'user', key: 'id' }
    },
    expiresAt: {
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

const sessionOptions = (sequelize: Sequelize): InitOptions<Session> => ({
    sequelize,
    tableName: "session",
    timestamps: true,
})

//

export { Session, sessionAttributes, sessionOptions }
