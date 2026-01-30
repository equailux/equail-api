import z from "zod";

//

const CaptureSchema = z.object({
    id: z.coerce.number().int(),
    eggs: z.coerce.number().int(),
    image: z.string().min(1),
    camera: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const CaptureCreateSchema = CaptureSchema.pick({ eggs: true, camera: true })
const CaptureUpdateSchema = CaptureSchema.pick({ eggs: true, camera: true }).partial()

//

type CaptureSchema = z.infer<typeof CaptureSchema>
type CaptureCreateSchema = z.infer<typeof CaptureCreateSchema>
type CaptureUpdateSchema = z.infer<typeof CaptureUpdateSchema>

//

export { CaptureSchema, CaptureCreateSchema, CaptureUpdateSchema }
