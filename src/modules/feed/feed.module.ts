import { FeedConfig } from "@/modules/feed/config/feed.config.model.js"
import { FeedConfigDefaults, FeedConfigSchema } from "@/modules/feed/config/feed.config.schema.js"
import espWebsocket from "@/realtime/websockets/esp.websocket.js"

//

const evaluate = async (level: number) => {
	const config = await findOrCreateConfig()
	const satisfied = isSatisfied(level, config.threshold)
	if (satisfied) await execute(config)
	return satisfied
}

const execute = async (config: FeedConfigSchema) => {
	const command = {
		servo1Ms: Number(config.servo1Ms),
		servo2Ms: Number(config.servo2Ms),
		stepperMs: Number(config.stepperMs),
	}

	await espWebsocket.broadcast({ name: "Feed", data: [command], query: "Create" })
}

//

const isSatisfied = (level: number, threshold: number) => Number(level) <= Number(threshold)

const findOrCreateConfig = async () => {
	const [config] = await FeedConfig.findOrCreate({ where: { id: 1 }, defaults: FeedConfigDefaults })
	return FeedConfigSchema.parse(config.dataValues)
}

//

export default { evaluate, execute, isSatisfied }
