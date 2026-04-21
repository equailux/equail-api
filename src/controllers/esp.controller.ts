import { Esp } from "@/models/esp.model.js"
import { EspCreateSchema, EspQuerySchema, EspUpdateSchema } from "@/schemas/esp.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(EspQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const esps = await Esp.findAll({ where, raw: true, limit, offset })
    res.send(esps)
}

const post: RequestHandler = async (req, res, next) => {
    const { data, error, success } = EspCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const esp = await Esp.create({ ...data })
    res.send(esp.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const eid = req.params.eid as string
    if (!eid) return res.status(400).send("Esp id required.")

    const { data, error, success } = EspUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const esp = await Esp.findByPk(eid)
    if (!esp) return res.status(404).send("Esp not found.")

    await esp.update(data)
    res.send(esp.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const eid = req.params.eid as string
    if (!eid) return res.status(400).send("Esp id required.")

    const count = await Esp.destroy({ where: { id: eid } })
    if (count <= 0) return res.status(404).send("Esp not found.")

    return res.status(204).send("Esp deleted successfully.")
}

//

export default { get, post, patch, destroy }
