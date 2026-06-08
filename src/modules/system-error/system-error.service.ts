import { Op } from "sequelize"
import { SystemError } from "@/modules/system-error/system-error.model.js"
import { PaginationSchema, type PaginationSchema as Pagination } from "@/shared/schemas/pagination.schema.js"
import type { SystemErrorCreateSchema, SystemErrorQuerySchema } from "@/modules/system-error/system-error.schema.js"

//

type SystemErrorFilters = Pagination & SystemErrorQuerySchema

//

const get = async (data: SystemErrorFilters) => {
	const keys = Object.keys(PaginationSchema.shape)
	const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

	const { alpha, omega, limit, offset } = data
	const where: any = Object.fromEntries(entries)
	const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
	if (Object.keys(createdAt).length) where.createdAt = createdAt

	return SystemError.findAll({ where, raw: true, limit, offset })
}

const log = async (data: SystemErrorCreateSchema) => {
	return SystemError.create(data)
}

//

export default { get, log }
