import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Otp extends Model<InferAttributes<Otp>, InferCreationAttributes<Otp>> {
    declare id: CreationOptional<number>
    declare digits: string
    declare revoked: boolean
    declare expiredAt: Date
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const otpAttributes: ModelAttributes<Otp, InferAttributes<Otp>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    digits: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    expiredAt: {
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

const otpOptions = (sequelize: Sequelize): InitOptions<Otp> => ({
    sequelize,
    tableName: "otps",
    timestamps: true,
})

//

export { Otp, otpAttributes, otpOptions }
