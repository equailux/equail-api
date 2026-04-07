import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Verification extends Model<InferAttributes<Verification>, InferCreationAttributes<Verification>> {
    declare id: string
    declare identifier: string
    declare value: string
    declare expiresAt: Date
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

const verificationAttributes: ModelAttributes<Verification, InferAttributes<Verification>> = {
    id: { 
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true
    },
    identifier: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    value: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    expiresAt: { 
        type: DataTypes.DATE, 
        allowNull: false
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

const verificationOptions = (sequelize: Sequelize): InitOptions<Verification> => ({
    sequelize,
    tableName: "verification",
    timestamps: true,
})

//

export { Verification, verificationAttributes, verificationOptions }
