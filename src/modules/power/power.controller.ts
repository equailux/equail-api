import { Power } from "@/modules/power/power.model.js"
import { PowerCreateSchema } from "@/modules/power/power.schema.js"
import { type RequestHandler } from "express"

//

const post: RequestHandler = async (req, res, next) => {
	const { data, error, success } = PowerCreateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const power = await Power.create(data)
	res.send(power.dataValues)
}

//

export default { post }
