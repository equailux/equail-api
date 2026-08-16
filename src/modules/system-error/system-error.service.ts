import { Op } from "sequelize"
import { SystemError } from "@/modules/system-error/system-error.model.js"
import { PaginationSchema, type PaginationSchema as Pagination } from "@/shared/schemas/pagination.schema.js"
import type { ReadingCreateSchema } from "@/modules/readings/reading.schema.js"
import type { SystemErrorCreateSchema, SystemErrorQuerySchema } from "@/modules/system-error/system-error.schema.js"

//

type SystemErrorFilters = Pagination & SystemErrorQuerySchema
type ReadingPayload = Omit<ReadingCreateSchema, "value"> & { tag: string; value: number | null }

//

const get = async (data: SystemErrorFilters) => {
	const keys = Object.keys(PaginationSchema.shape)
	const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

	const { alpha, omega, limit, offset } = data
	const where: any = Object.fromEntries(entries)
	const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
	if (Object.keys(createdAt).length) where.createdAt = createdAt

	const { rows, count } = await SystemError.findAndCountAll({
		where,
		raw: true,
		limit,
		offset,
		order: [["createdAt", "DESC"]],
	})

	return { rows, total: count }
}

const log = async (data: SystemErrorCreateSchema) => {
	return SystemError.create(data)
}

const logNullReadings = async (readings: ReadingPayload[]) => {
	await Promise.all(
		readings.map(reading => {
			const label = reading.tag || reading.name || "Unknown"
			const title = `${label} sensor reading null.`
			const description = `Received null reading value from ${label} sensor.`

			return log({ title, description })
		})
	)
}

//

export type { ReadingPayload }
export default { get, log, logNullReadings }
