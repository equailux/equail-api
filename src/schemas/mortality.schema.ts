import z from "zod";

//

const MortalitySchema = z.object({
    id: z.coerce.number().int(),
    count: z.coerce.number().int(),
    date: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const MortalityCreateSchema = MortalitySchema.pick({ count: true, date: true })
const MortalityUpdateSchema = MortalitySchema.pick({ count: true, date: true }).partial()

//

type MortalitySchema = z.infer<typeof MortalitySchema>
type MortalityCreateSchema = z.infer<typeof MortalityCreateSchema>
type MortalityUpdateSchema = z.infer<typeof MortalityUpdateSchema>

//

export { MortalitySchema, MortalityCreateSchema, MortalityUpdateSchema }
