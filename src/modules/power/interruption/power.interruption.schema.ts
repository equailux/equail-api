import z from "zod"

//

const PowerInterruptionSchema = z.object({
	id: z.coerce.number().int(),
	powered: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const PowerInterruptionCreateSchema = PowerInterruptionSchema.pick({ powered: true })

//

type PowerInterruptionSchema = z.infer<typeof PowerInterruptionSchema>
type PowerInterruptionCreateSchema = z.infer<typeof PowerInterruptionCreateSchema>

//

export { PowerInterruptionSchema, PowerInterruptionCreateSchema }
