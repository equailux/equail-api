import z from "zod";

//

const EspSchema = z.object({
    id: z.coerce.number().int(),
    tag: z.string().min(1),
    name: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const EspQuerySchema = EspSchema.partial()
const EspCreateSchema = EspSchema.pick({ tag: true, name: true })
const EspUpdateSchema = EspSchema.pick({ tag: true, name: true }).partial()

//

type EspSchema = z.infer<typeof EspSchema>
type EspQuerySchema = z.infer<typeof EspQuerySchema>
type EspCreateSchema = z.infer<typeof EspCreateSchema>
type EspUpdateSchema = z.infer<typeof EspUpdateSchema>

//

export { EspSchema, EspQuerySchema, EspCreateSchema, EspUpdateSchema }
