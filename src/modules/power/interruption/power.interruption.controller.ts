import powerInterruptionService from "@/modules/power/interruption/power.interruption.service.js"
import { PowerInterruptionCreateSchema } from "@/modules/power/interruption/power.interruption.schema.js"
import { type RequestHandler } from "express"

//

const post: RequestHandler = async (req, res, next) => {
	const { data, error, success } = PowerInterruptionCreateSchema.safeParse(req.body)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const powerInterruption = await powerInterruptionService.evaluate(data.powered)
	res.send(powerInterruption.dataValues)
}

//

export default { post }
