import z from "zod"

//

const PowerSchema = z.object({
	id: z.coerce.number().int(),
	level: z.coerce.number().min(0).max(100),
	unit: z.string().min(1).default("%"),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const PowerCreateSchema = PowerSchema.pick({ level: true, unit: true })

//

type PowerSchema = z.infer<typeof PowerSchema>
type PowerCreateSchema = z.infer<typeof PowerCreateSchema>

//

export { PowerSchema, PowerCreateSchema }
