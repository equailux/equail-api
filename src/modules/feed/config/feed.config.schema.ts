import z from "zod"

//

const FeedConfigSchema = z.object({
	id: z.coerce.number().int(),
	servo1Ms: z.coerce.number().int().nonnegative(),
	servo2Ms: z.coerce.number().int().nonnegative(),
	stepperMs: z.coerce.number().int().nonnegative(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const FeedConfigQuerySchema = FeedConfigSchema.partial()
const FeedConfigCreateSchema = FeedConfigSchema.omit({ id: true, createdAt: true, updatedAt: true })
const FeedConfigUpdateSchema = FeedConfigCreateSchema.partial()

//

type FeedConfigSchema = z.infer<typeof FeedConfigSchema>
type FeedConfigQuerySchema = z.infer<typeof FeedConfigQuerySchema>
type FeedConfigCreateSchema = z.infer<typeof FeedConfigCreateSchema>
type FeedConfigUpdateSchema = z.infer<typeof FeedConfigUpdateSchema>

//

export { FeedConfigSchema, FeedConfigQuerySchema, FeedConfigCreateSchema, FeedConfigUpdateSchema }
