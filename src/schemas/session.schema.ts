import z from "zod"

//

const SessionSchema = z.object({
    id: z.string(),
    token: z.string(),
    ipAddress: z.string(),
    userAgent: z.string(),
    userId: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

//

type SessionSchema = z.infer<typeof SessionSchema>

//

export { SessionSchema }