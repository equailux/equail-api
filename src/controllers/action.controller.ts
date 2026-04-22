import { Action } from "@/models/action.model.js"
import { ActionCreateSchema, ActionQuerySchema, ActionUpdateSchema } from "@/schemas/action.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(ActionQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const actions = await Action.findAll({ where, raw: true, limit, offset })
    res.send(actions)
}

const post: RequestHandler = async (req, res, next) => {
    const { tid, aid } = req.params as { tid: string, aid: string }
    if (!tid) return res.status(400).send("Threhold and actuator id required.")
    
    const { data, error, success } = ActionCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const action = await Action.create({ ...data, actuatorId: parseInt(aid), thresholdId: parseInt(tid) })
    res.send(action.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const aid = req.params.aid as string
    if (!aid) return res.status(400).send("Action id required.")

    const { data, error, success } = ActionUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const action = await Action.findByPk(aid)
    if (!action) return res.status(404).send("Action not found.")

    await action.update(data)
    res.send(action.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const aid = req.params.aid as string
    if (!aid) return res.status(400).send("Action id required.")

    const count = await Action.destroy({ where: { id: aid } })
    if (count <= 0) return res.status(404).send("Action not found.")

    return res.status(204).send("Action deleted successfully.")
}

//

export default { get, post, patch, destroy }
