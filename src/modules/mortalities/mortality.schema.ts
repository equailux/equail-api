import z from "zod";

//

const MortalitySchema = z.object({
    id: z.coerce.number().int(),
    count: z.coerce.number().int(),
    date: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const MortalityQuerySchema = MortalitySchema.partial()
const MortalityCreateSchema = MortalitySchema.pick({ count: true, date: true })
const MortalityUpdateSchema = MortalitySchema.pick({ count: true, date: true }).partial()

//

type MortalitySchema = z.infer<typeof MortalitySchema>
type MortalityQuerySchema = z.infer<typeof MortalityQuerySchema>
type MortalityCreateSchema = z.infer<typeof MortalityCreateSchema>
type MortalityUpdateSchema = z.infer<typeof MortalityUpdateSchema>

//

export { MortalitySchema, MortalityQuerySchema, MortalityCreateSchema, MortalityUpdateSchema }
