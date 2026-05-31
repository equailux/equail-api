import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type { InitOptions, InferAttributes, CreationOptional, InferCreationAttributes } from "sequelize"

//

class PowerInterruption extends Model<InferAttributes<PowerInterruption>, InferCreationAttributes<PowerInterruption>> {
	declare id: CreationOptional<number>
	declare powered: boolean
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
}

//

const powerInterruptionAttributes: ModelAttributes<PowerInterruption, InferAttributes<PowerInterruption>> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	powered: {
		type: DataTypes.BOOLEAN,
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

const powerInterruptionOptions = (sequelize: Sequelize): InitOptions<PowerInterruption> => ({
	sequelize,
	tableName: "power_interruptions",
	timestamps: true,
})

//

export { PowerInterruption, powerInterruptionAttributes, powerInterruptionOptions }
