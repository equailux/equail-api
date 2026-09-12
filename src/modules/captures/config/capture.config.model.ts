import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class CaptureConfig extends Model<InferAttributes<CaptureConfig>, InferCreationAttributes<CaptureConfig>> {
	declare id: CreationOptional<number>
	declare intervalMs: number
	declare enabled: boolean
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const captureConfigAttributes: ModelAttributes<CaptureConfig, InferAttributes<CaptureConfig>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		defaultValue: 1,
	},
	intervalMs: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 3600000,
		validate: { min: 5000 },
	},
	enabled: {
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

const captureConfigOptions = (sequelize: Sequelize): InitOptions<CaptureConfig> => ({
	sequelize,
	tableName: "capture_configs",
	timestamps: true,
})

//

export { CaptureConfig, captureConfigAttributes, captureConfigOptions }
