import systemErrorService from "@/modules/system-error/system-error.service.js"
import { SystemErrorQuerySchema } from "@/modules/system-error/system-error.schema.js"
import { PaginationSchema } from "@/shared/schemas/pagination.schema.js"
import { type RequestHandler } from "express"

//

const get: RequestHandler = async (req, res, next) => {
	const { data, error, success } = PaginationSchema.and(SystemErrorQuerySchema).safeParse(req.query)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const systemErrors = await systemErrorService.get(data)
	res.send(systemErrors)
}

//

export default { get }
