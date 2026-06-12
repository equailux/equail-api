import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class Collection extends Model<InferAttributes<Collection>, InferCreationAttributes<Collection>> {
	declare id: CreationOptional<number>
	declare count: number
	declare collectAt: Date
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const collectionAttributes: ModelAttributes<Collection, InferAttributes<Collection>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	count: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	collectAt: {
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

const collectionOptions = (sequelize: Sequelize): InitOptions<Collection> => ({
	sequelize,
	tableName: "collections",
	timestamps: true,
})

//

export { Collection, collectionAttributes, collectionOptions }
