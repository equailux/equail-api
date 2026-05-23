import env from "@/config/env.config.js"
import { FeedConfig } from "@/modules/feed/config/feed.config.model.js"
import { FeedConfigCreateSchema } from "@/modules/feed/config/feed.config.schema.js"

//

const boot = async () => {
	if (!env.boot.database) return console.info(`Feed config boot skipped.`)
	const data: FeedConfigCreateSchema = { servo1Ms: 5000, servo2Ms: 5000, stepperMs: 10000 }
	const [_, created] = await FeedConfig.findOrCreate({ where: { id: 1 }, defaults: data, raw: true })
	console.info(`Feed config ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
