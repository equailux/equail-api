import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes, ForeignKey } from "sequelize"

//

class Device extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
	declare id: CreationOptional<number>
	declare token: string
	declare userId: ForeignKey<string>
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const deviceAttributes: ModelAttributes<Device, InferAttributes<Device>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: "token",
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false,
		references: { model: "user", key: "id" },
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

const deviceOptions = (sequelize: Sequelize): InitOptions<Device> => ({
	sequelize,
	tableName: "devices",
	timestamps: true,
})

//

export { Device, deviceAttributes, deviceOptions }
