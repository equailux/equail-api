import z from "zod"

//

const DeviceSchema = z.object({
	id: z.coerce.number().int(),
	token: z.string().min(1),
	userId: z.string().min(1),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const DeviceCreateSchema = DeviceSchema.pick({ token: true })

//

type DeviceSchema = z.infer<typeof DeviceSchema>
type DeviceCreateSchema = z.infer<typeof DeviceCreateSchema>

//

export { DeviceSchema, DeviceCreateSchema }
