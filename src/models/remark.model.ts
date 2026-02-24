import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Remark extends Model<InferAttributes<Remark>, InferCreationAttributes<Remark>> {
    declare id: CreationOptional<number>
    declare comment: string
    declare approved?: boolean
    declare captureId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const remarkAttributes: ModelAttributes<Remark, InferAttributes<Remark>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    approved: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: undefined,
    },
    captureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { key: "id", model: "captures" },
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

const remarkOptions = (sequelize: Sequelize): InitOptions<Remark> => ({
    sequelize,
    tableName: "remarks",
    timestamps: true,
})

//

export { Remark, remarkAttributes, remarkOptions }
