import z from "zod"

//

const CaptureConfigSchema = z.object({
	id: z.coerce.number().int(),
	intervalMs: z.coerce.number().int().min(5000).max(86400000),
	enabled: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const CaptureConfigQuerySchema = CaptureConfigSchema.partial()
const CaptureConfigCreateSchema = CaptureConfigSchema.omit({ id: true, createdAt: true, updatedAt: true })
const CaptureConfigUpdateSchema = CaptureConfigCreateSchema.partial()

//

type CaptureConfigSchema = z.infer<typeof CaptureConfigSchema>
type CaptureConfigQuerySchema = z.infer<typeof CaptureConfigQuerySchema>
type CaptureConfigCreateSchema = z.infer<typeof CaptureConfigCreateSchema>
type CaptureConfigUpdateSchema = z.infer<typeof CaptureConfigUpdateSchema>

//

const CaptureConfigDefaults: CaptureConfigCreateSchema = {
	intervalMs: 3600000,
	enabled: true,
}

//

export {
	CaptureConfigSchema,
	CaptureConfigQuerySchema,
	CaptureConfigCreateSchema,
	CaptureConfigUpdateSchema,
	CaptureConfigDefaults,
}
