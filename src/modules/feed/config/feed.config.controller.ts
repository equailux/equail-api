import { FeedConfig } from "@/modules/feed/config/feed.config.model.js"
import { FeedConfigCreateSchema, FeedConfigUpdateSchema } from "@/modules/feed/config/feed.config.schema.js"
import { type RequestHandler } from "express"

//

const defaults: FeedConfigCreateSchema = {
	servo1Ms: 0,
	servo2Ms: 0,
	stepperMs: 0,
}

const findOrCreate = async () => {
	const [config] = await FeedConfig.findOrCreate({ where: { id: 1 }, defaults })
	return config
}

//

const get: RequestHandler = async (req, res, next) => {
	const config = await findOrCreate()
	res.send(config.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
	const { data, error, success } = FeedConfigUpdateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const config = await findOrCreate()
	await config.update(data)
	res.send(config.dataValues)
}

//

export default { get, patch }
