import env from "@/config/env.config.js"
import { FeedConfig } from "@/modules/feed/config/feed.config.model.js"
import { FeedConfigDefaults } from "@/modules/feed/config/feed.config.schema.js"

//

const boot = async () => {
	if (!env.boot.database) return console.info(`Feed config boot skipped.`)
	const [_, created] = await FeedConfig.findOrCreate({ where: { id: 1 }, defaults: FeedConfigDefaults, raw: true })
	console.info(`Feed config ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
