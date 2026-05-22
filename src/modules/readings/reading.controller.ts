import { Reading } from "@/modules/readings/reading.model.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { ReadingCreateSchema, ReadingQuerySchema, ReadingUpdateSchema } from "@/modules/readings/reading.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(ReadingQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const readings = await Reading.findAll({ where, raw: true, limit, offset })
    res.send(readings)
}

//

export default { get }
