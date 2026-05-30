import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class Power extends Model<InferAttributes<Power>, InferCreationAttributes<Power>> {
	declare id: CreationOptional<number>
	declare level: number
	declare unit: CreationOptional<string>
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const powerAttributes: ModelAttributes<Power, InferAttributes<Power>> = {
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
	unit: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "%",
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

const powerOptions = (sequelize: Sequelize): InitOptions<Power> => ({
	sequelize,
	tableName: "powers",
	timestamps: true,
})

//

export { Power, powerAttributes, powerOptions }
