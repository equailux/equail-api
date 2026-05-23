import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes, ForeignKey } from "sequelize"

//

class Feed extends Model<InferAttributes<Feed>, InferCreationAttributes<Feed>> {
	declare id: CreationOptional<number>
	declare level: number
	declare detectionId: CreationOptional<ForeignKey<number> | null>
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const feedAttributes: ModelAttributes<Feed, InferAttributes<Feed>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	level: {
		type: DataTypes.DECIMAL(5, 2),
		allowNull: false,
		validate: { min: 0, max: 100 },
	},
	detectionId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: { model: "detections", key: "id" },
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

const feedOptions = (sequelize: Sequelize): InitOptions<Feed> => ({
	sequelize,
	tableName: "feeds",
	timestamps: true,
})

//

export { Feed, feedAttributes, feedOptions }
