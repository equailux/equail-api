import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class SystemError extends Model<InferAttributes<SystemError>, InferCreationAttributes<SystemError>> {
	declare id: CreationOptional<number>
	declare title: string
	declare description: string
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const systemErrorAttributes: ModelAttributes<SystemError, InferAttributes<SystemError>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
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

const systemErrorOptions = (sequelize: Sequelize): InitOptions<SystemError> => ({
	sequelize,
	tableName: "system_errors",
	timestamps: true,
})

//

export { SystemError, systemErrorAttributes, systemErrorOptions }
