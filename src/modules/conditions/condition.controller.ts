import { Condition } from "@/modules/conditions/condition.model.js"
import { ConditionCreateSchema, ConditionQuerySchema, ConditionUpdateSchema } from "@/modules/conditions/condition.schema.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(ConditionQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const conditions = await Condition.findAll({ where, raw: true, limit, offset })
    res.send(conditions)
}

const post: RequestHandler = async (req, res, next) => {
    const tid = req.params.tid as string
    if (!tid) return res.status(400).send("Threhold id required.")
    
    const { data, error, success } = ConditionCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const condition = await Condition.create({ ...data, thresholdId: parseInt(tid) })
    res.send(condition.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const cid = req.params.cid as string
    if (!cid) return res.status(400).send("Condition id required.")

    const { data, error, success } = ConditionUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const condition = await Condition.findByPk(cid)
    if (!condition) return res.status(404).send("Condition not found.")

    await condition.update(data)
    res.send(condition.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const cid = req.params.cid as string
    if (!cid) return res.status(400).send("Condition id required.")

    const count = await Condition.destroy({ where: { id: cid } })
    if (count <= 0) return res.status(404).send("Condition not found.")

    return res.status(204).send("Condition deleted successfully.")
}

//

export default { get, post, patch, destroy }
