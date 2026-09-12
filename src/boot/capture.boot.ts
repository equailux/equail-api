import env from "@/config/env.config.js"
import { CaptureConfig } from "@/modules/captures/config/capture.config.model.js"
import { CaptureConfigDefaults } from "@/modules/captures/config/capture.config.schema.js"

//

const boot = async () => {
	if (!env.boot.database) return console.info(`Capture config boot skipped.`)
	const [_, created] = await CaptureConfig.findOrCreate({ where: { id: 1 }, defaults: CaptureConfigDefaults, raw: true })
	console.info(`Capture config ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
