import { Actuator } from "@/models/actuator.model.js"
import { ActuatorCreateSchema, ActuatorQuerySchema, ActuatorUpdateSchema } from "@/schemas/actuator.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(ActuatorQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const actuators = await Actuator.findAll({ where, raw: true, limit, offset })
    res.send(actuators)
}

const post: RequestHandler = async (req, res, next) => {
    const { data, error, success } = ActuatorCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const actuator = await Actuator.create({ ...data })
    res.send(actuator.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const aid = req.params.aid as string
    if (!aid) return res.status(400).send("Actuator id required.")

    const { data, error, success } = ActuatorUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const actuator = await Actuator.findByPk(aid)
    if (!actuator) return res.status(404).send("Actuator not found.")

    await actuator.update(data)
    res.send(actuator.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const aid = req.params.aid as string
    if (!aid) return res.status(400).send("Actuator id required.")

    const count = await Actuator.destroy({ where: { id: aid } })
    if (count <= 0) return res.status(404).send("Actuator not found.")

    return res.status(204).send("Actuator deleted successfully.")
}

//

export default { get, post, patch, destroy }
