import { Capture } from "@/models/capture.model.js"
import { CaptureCreateSchema, CaptureQuerySchema, CaptureUpdateSchema } from "@/schemas/capture.schema.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
    const { data, error, success } = PaginationSchema.and(CaptureQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    where.createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }

    const captures = await Capture.findAll({ where, raw: true, limit, offset })
    res.send(captures)
}

const post: RequestHandler = async (req, res, next) => {
    const { data, error, success } = CaptureCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    // --- Save Image
    // --- Send Image to AI API for Detections

    // const capture = await Capture.create(data)
    // res.send(capture.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
    const id = req.params.id as string
    if (!id) return res.status(400).send("Capture id required.")

    const { data, error, success } = CaptureUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const capture = await Capture.findByPk(id)
    if (!capture) return res.status(404).send("Capture not found.")

    await capture.update(data)
    res.send(capture.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
    const id = req.params.id as string
    if (!id) return res.status(400).send("Capture id required.")

    const count = await Capture.destroy({ where: { id } })
    if (count <= 0) return res.status(404).send("Capture not found.")

    return res.status(204).send("Capture deleted successfully.")
}

//

export default { get, post, patch, destroy }
