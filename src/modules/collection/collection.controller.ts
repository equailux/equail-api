import { Collection } from "@/modules/collection/collection.model.js"
import {
	CollectionCreateSchema,
	CollectionQuerySchema,
	CollectionUpdateSchema,
} from "@/modules/collection/collection.schema.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
	const { data, error, success } = PaginationSchema.and(CollectionQuerySchema).safeParse(req.query)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const keys = Object.keys(PaginationSchema.shape)
	const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

	const { alpha, omega, limit, offset } = data
	const where: any = Object.fromEntries(entries)
	const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
	if (Object.keys(createdAt).length) where.createdAt = createdAt

	const collections = await Collection.findAll({ where, raw: true, limit, offset })
	res.send(collections)
}

const post: RequestHandler = async (req, res, next) => {
	const { data, error, success } = CollectionCreateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const collection = await Collection.create(data)
	res.send(collection.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
	const cid = req.params.cid as string
	if (!cid) return res.status(400).send("Collection id required.")

	const { data, error, success } = CollectionUpdateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const collection = await Collection.findByPk(cid)
	if (!collection) return res.status(404).send("Collection not found.")

	await collection.update(data)
	res.send(collection.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
	const cid = req.params.cid as string
	if (!cid) return res.status(400).send("Collection id required.")

	const count = await Collection.destroy({ where: { id: cid } })
	if (count <= 0) return res.status(404).send("Collection not found.")

	return res.status(204).send("Collection deleted successfully.")
}

//

export default { get, post, patch, destroy }
