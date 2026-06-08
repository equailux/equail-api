import z from "zod"

//

const SystemErrorSchema = z.object({
	id: z.coerce.number().int(),
	title: z.string().min(1),
	description: z.string().min(1),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const SystemErrorQuerySchema = SystemErrorSchema.partial()
const SystemErrorCreateSchema = SystemErrorSchema.pick({ title: true, description: true })

//

type SystemErrorSchema = z.infer<typeof SystemErrorSchema>
type SystemErrorQuerySchema = z.infer<typeof SystemErrorQuerySchema>
type SystemErrorCreateSchema = z.infer<typeof SystemErrorCreateSchema>

//

export { SystemErrorSchema, SystemErrorQuerySchema, SystemErrorCreateSchema }
