import { Sensor } from "@/models/sensor.model.js"
import { SensorCreateSchema, SensorQuerySchema, SensorUpdateSchema } from "@/schemas/sensor.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(SensorQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const sensors = await Sensor.findAll({ where, raw: true, limit, offset })
    res.send(sensors)
}

const post: RequestHandler = async (req, res, next) => {
    const eid = req.params.eid as string
    if (!eid) return res.status(400).send("Esp id required.")
    
    const { data, error, success } = SensorCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const sensor = await Sensor.create({ ...data, espId: parseInt(eid) })
    res.send(sensor.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const sid = req.params.sid as string
    if (!sid) return res.status(400).send("Sensor id required.")

    const { data, error, success } = SensorUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const sensor = await Sensor.findByPk(sid)
    if (!sensor) return res.status(404).send("Sensor not found.")

    await sensor.update(data)
    res.send(sensor.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const sid = req.params.sid as string
    if (!sid) return res.status(400).send("Sensor id required.")

    const count = await Sensor.destroy({ where: { id: sid } })
    if (count <= 0) return res.status(404).send("Sensor not found.")

    return res.status(204).send("Sensor deleted successfully.")
}

//

export default { get, post, patch, destroy }
