import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class Settings extends Model<InferAttributes<Settings>, InferCreationAttributes<Settings>> {
    declare id: CreationOptional<number>
    declare allowPushNotifications: boolean
    declare allowLowFeedAlerts: boolean
    declare allowLowWaterAlerts: boolean
    declare allowEnvironmentAlerts: boolean
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const settingsAttributes: ModelAttributes<Settings, InferAttributes<Settings>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    allowPushNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    allowLowFeedAlerts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    allowLowWaterAlerts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    allowEnvironmentAlerts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

const settingsOptions = (sequelize: Sequelize): InitOptions<Settings> => ({
    sequelize,
    tableName: "settings",
    timestamps: true,
})

//

export { Settings, settingsAttributes, settingsOptions }
