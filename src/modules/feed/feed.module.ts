import { Device } from "@/modules/devices/device.model.js"
import { FeedConfig } from "@/modules/feed/config/feed.config.model.js"
import { FeedConfigDefaults, FeedConfigSchema } from "@/modules/feed/config/feed.config.schema.js"
import { FeedManualSchema } from "@/modules/feed/feed.schema.js"
import espWebsocket from "@/realtime/websockets/esp.websocket.js"
import firebaseService from "@/shared/services/firebase.service.js"

//

const evaluate = async (level: number) => {
	const config = await findOrCreateConfig()
	const satisfied = isSatisfied(level, config.threshold)
	if (satisfied) {
		await execute(config)
		await notifyUsers(level, config).catch(console.error)
	}
	return satisfied
}

const test = async () => {
	const config = await findOrCreateConfig()
	return await execute(config)
}

const manual = async (input: FeedManualSchema) => {
	const command = {
		direction: input.direction === "Forward" ? 1 : -1,
		durationMs: Number(input.durationMs),
	}

	await espWebsocket.broadcast({ name: "FeedManual", data: [command], query: "Create" })
	return command
}

const execute = async (config: FeedConfigSchema) => {
	const command = {
		servo1Ms: Number(config.servo1Ms),
		servo2Ms: Number(config.servo2Ms),
		stepperMs: Number(config.stepperMs),
	}

	await espWebsocket.broadcast({ name: "Feed", data: [command], query: "Create" })
	return command
}

const notifyUsers = async (level: number, config: FeedConfigSchema) => {
	const devices = await Device.findAll({ attributes: ["token"], raw: true })
	const tokens = devices.map(device => device.token).filter(Boolean)
	if (!tokens.length) return

	await firebaseService.fcm.sendEachForMulticast({
		tokens,
		notification: {
			title: "Feed Level Low",
			body: `Feed level is ${level}%, below the configured threshold of ${config.threshold}%.`,
		},
	})
}

//

const isSatisfied = (level: number, threshold: number) => Number(level) <= Number(threshold)

const findOrCreateConfig = async () => {
	const [config] = await FeedConfig.findOrCreate({ where: { id: 1 }, defaults: FeedConfigDefaults })
	return FeedConfigSchema.parse(config.dataValues)
}

//

export default { evaluate, execute, test, manual, isSatisfied }
