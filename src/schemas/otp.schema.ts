import z from "zod";

//

const OtpSchema = z.object({
    id: z.coerce.number().int(),
    digits: z.string().length(6),
    revoked: z.coerce.boolean().default(false),
    expiredAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const OtpQuerySchema = OtpSchema.partial()
const OtpDigitsSchema = OtpSchema.pick({ digits: true })
const OtpCreateSchema = OtpSchema.pick({ digits: true, revoked: true, expiredAt: true })
const OtpUpdateSchema = OtpSchema.pick({ digits: true, revoked: true, expiredAt: true }).partial()

//

type OtpSchema = z.infer<typeof OtpSchema>
type OtpQuerySchema = z.infer<typeof OtpQuerySchema>
type OtpDigitsSchema = z.infer<typeof OtpDigitsSchema>
type OtpCreateSchema = z.infer<typeof OtpCreateSchema>
type OtpUpdateSchema = z.infer<typeof OtpUpdateSchema>

//

export { OtpSchema, OtpQuerySchema, OtpDigitsSchema, OtpCreateSchema, OtpUpdateSchema }
