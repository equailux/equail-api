import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class FeedConfig extends Model<InferAttributes<FeedConfig>, InferCreationAttributes<FeedConfig>> {
	declare id: CreationOptional<number>
	declare servo1Ms: number
	declare servo2Ms: number
	declare stepperMs: number
	declare threshold: number
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const feedConfigAttributes: ModelAttributes<FeedConfig, InferAttributes<FeedConfig>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		defaultValue: 1,
	},
	servo1Ms: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	servo2Ms: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	stepperMs: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	threshold: {
		type: DataTypes.DECIMAL(5, 2),
		allowNull: false,
		defaultValue: 25,
		validate: { min: 0, max: 100 },
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

const feedConfigOptions = (sequelize: Sequelize): InitOptions<FeedConfig> => ({
	sequelize,
	tableName: "feed_configs",
	timestamps: true,
})

//

export { FeedConfig, feedConfigAttributes, feedConfigOptions }
