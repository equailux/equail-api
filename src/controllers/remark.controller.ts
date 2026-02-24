import { Remark } from "@/models/remark.model.js"
import { RemarkCreateSchema, RemarkQuerySchema, RemarkUpdateSchema } from "@/schemas/remark.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(RemarkQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    where.createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }

    const remarks = await Remark.findAll({ where, raw: true, limit, offset })
    res.send(remarks)
}

const post: RequestHandler = async (req, res, next) => {
    const cid = req.params.cid as string
    if (!cid) return res.status(400).send("Capture id required.")

    const { data, error, success } = RemarkCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const remark = await Remark.create({ ...data, captureId: Number(cid) })
    res.send(remark.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const rid = req.params.rid as string
    if (!rid) return res.status(400).send("Remark id required.")

    const { data, error, success } = RemarkUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const remark = await Remark.findByPk(rid)
    if (!remark) return res.status(404).send("Remark not found.")

    await remark.update(data)
    res.send(remark.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const rid = req.params.rid as string
    if (!rid) return res.status(400).send("Remark id required.")

    const count = await Remark.destroy({ where: { id: rid } })
    if (count <= 0) return res.status(404).send("Remark not found.")

    return res.status(204).send("Remark deleted successfully.")
}

//

export default { get, post, patch, destroy }
