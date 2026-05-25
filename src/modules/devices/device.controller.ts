import { Device } from "@/modules/devices/device.model.js"
import { DeviceCreateSchema } from "@/modules/devices/device.schema.js"
import { type RequestHandler } from "express"

//

const post: RequestHandler = async (req, res, next) => {
	const userId = req.user?.id
	if (!userId) return res.status(401).send("Authorization required.")

	const { data, error, success } = DeviceCreateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const defaults = { ...data, userId }
	const [device] = await Device.findOrCreate({ where: { token: data.token }, defaults })

	await device.update(defaults)
	res.send(device.dataValues)
}

//

export default { post }
