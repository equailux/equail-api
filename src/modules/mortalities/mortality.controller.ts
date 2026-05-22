import { Mortality } from "@/modules/mortalities/mortality.model.js"
import { MortalityCreateSchema, MortalityQuerySchema, MortalityUpdateSchema } from "@/modules/mortalities/mortality.schema.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(MortalityQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const mortalities = await Mortality.findAll({ where, raw: true, limit, offset })
    res.send(mortalities)
}

const post: RequestHandler = async (req, res, next) => {
    const { data, error, success } = MortalityCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const mortality = await Mortality.create(data)
    res.send(mortality.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const mid = req.params.mid as string
    if (!mid) return res.status(400).send("Mortality id required.")

    const { data, error, success } = MortalityUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const mortality = await Mortality.findByPk(mid)
    if (!mortality) return res.status(404).send("Mortality not found.")

    await mortality.update(data)
    res.send(mortality.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const mid = req.params.mid as string
    if (!mid) return res.status(400).send("Mortality id required.")

    const count = await Mortality.destroy({ where: { id: mid } })
    if (count <= 0) return res.status(404).send("Mortality not found.")

    return res.status(204).send("Mortality deleted successfully.")
}

//

export default { get, post, patch, destroy }
