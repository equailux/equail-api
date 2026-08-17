import { Feed } from "@/modules/feed/feed.model.js"
import { FeedCreateSchema, FeedManualSchema, FeedQuerySchema, FeedUpdateSchema } from "@/modules/feed/feed.schema.js"
import feedModule from "@/modules/feed/feed.module.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res, next) => {
	const { data, error, success } = PaginationSchema.and(FeedQuerySchema).safeParse(req.query)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const keys = Object.keys(PaginationSchema.shape)
	const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

	const { alpha, omega, limit, offset } = data
	const where: any = Object.fromEntries(entries)
	const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
	if (Object.keys(createdAt).length) where.createdAt = createdAt

	const feeds = await Feed.findAll({ where, raw: true, limit, offset })
	res.send(feeds)
}

const post: RequestHandler = async (req, res, next) => {
	const { data, error, success } = FeedCreateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const feed = await Feed.create(data)
	res.send(feed.dataValues)
	await feedModule.evaluate(feed.level)
}

const test: RequestHandler = async (req, res, next) => {
	const command = await feedModule.test()
	res.send({ command })
}

const manual: RequestHandler = async (req, res, next) => {
	const { data, error, success } = FeedManualSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const command = await feedModule.manual(data)
	res.send({ command })
}

const patch: RequestHandler = async (req, res, next) => {
	const fid = req.params.fid as string
	if (!fid) return res.status(400).send("Feed id required.")

	const { data, error, success } = FeedUpdateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const feed = await Feed.findByPk(fid)
	if (!feed) return res.status(404).send("Feed not found.")

	await feed.update(data)
	res.send(feed.dataValues)
}

const destroy: RequestHandler = async (req, res, next) => {
	const fid = req.params.fid as string
	if (!fid) return res.status(400).send("Feed id required.")

	const count = await Feed.destroy({ where: { id: fid } })
	if (count <= 0) return res.status(404).send("Feed not found.")

	return res.status(204).send("Feed deleted successfully.")
}

//

export default { get, post, test, manual, patch, destroy }
