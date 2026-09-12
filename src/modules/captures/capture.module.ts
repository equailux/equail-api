import { CaptureConfig } from "@/modules/captures/config/capture.config.model.js"
import { CaptureConfigDefaults, CaptureConfigSchema } from "@/modules/captures/config/capture.config.schema.js"
import espWebsocket from "@/realtime/websockets/esp.websocket.js"

//

const findOrCreateConfig = async () => {
	const [config] = await CaptureConfig.findOrCreate({ where: { id: 1 }, defaults: CaptureConfigDefaults })
	return CaptureConfigSchema.parse(config.dataValues)
}

//

const trigger = async () => {
	const command = { requestedAt: Date.now() }
	await espWebsocket.broadcast({ name: "Capture", data: [command], query: "Create" })
	return command
}

const configure = async (config: CaptureConfigSchema) => {
	const command = {
		intervalMs: Number(config.intervalMs),
		enabled: !!config.enabled,
	}

	await espWebsocket.broadcast({ name: "CaptureConfig", data: [command], query: "Update" })
	return command
}

//

export default { findOrCreateConfig, trigger, configure }
