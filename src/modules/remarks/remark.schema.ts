import z from "zod";

//

const RemarkSchema = z.object({
    id: z.coerce.number().int(),
    comment: z.string().default(""),
    approved: z.boolean().optional(),
    captureId: z.coerce.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const RemarkQuerySchema = RemarkSchema.extend({ comment: z.string() }).partial()
const RemarkCreateSchema = RemarkSchema.pick({ comment: true, approved: true })
const RemarkUpdateSchema = RemarkSchema.pick({ comment: true, approved: true }).partial()

//

type RemarkSchema = z.infer<typeof RemarkSchema>
type RemarkQuerySchema = z.infer<typeof RemarkQuerySchema>
type RemarkCreateSchema = z.infer<typeof RemarkCreateSchema>
type RemarkUpdateSchema = z.infer<typeof RemarkUpdateSchema>

//

export { RemarkSchema, RemarkQuerySchema, RemarkCreateSchema, RemarkUpdateSchema }
