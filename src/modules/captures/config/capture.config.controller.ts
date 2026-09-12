import captureModule from "@/modules/captures/capture.module.js"
import { CaptureConfig } from "@/modules/captures/config/capture.config.model.js"
import {
	CaptureConfigDefaults,
	CaptureConfigSchema,
	CaptureConfigUpdateSchema,
} from "@/modules/captures/config/capture.config.schema.js"
import { type RequestHandler } from "express"

//

const findOrCreate = async () => {
	const [config] = await CaptureConfig.findOrCreate({ where: { id: 1 }, defaults: CaptureConfigDefaults })
	return config
}

//

const get: RequestHandler = async (req, res, next) => {
	const config = await findOrCreate()
	res.send(config.dataValues)
}

const patch: RequestHandler = async (req, res, next) => {
	const { data, error, success } = CaptureConfigUpdateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const config = await findOrCreate()
	await config.update(data)
	res.send(config.dataValues)

	// --- Push the new schedule to the camera hosts right away.
	await captureModule.configure(CaptureConfigSchema.parse(config.dataValues)).catch(console.error)
}

//

export default { get, patch }
