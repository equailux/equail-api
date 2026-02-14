import z from "zod";

//

const DetectionSchema = z.object({
    id: z.coerce.number().int(),
    x: z.coerce.number(),
    y: z.coerce.number(),
    w: z.coerce.number(),
    h: z.coerce.number(),
    class: z.string().min(1),
    confidence: z.coerce.number(),
    captureId: z.coerce.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const DetectionQuerySchema = DetectionSchema.partial()

const DetectionCreateSchema = DetectionSchema.pick({
    x: true, 
    y: true, 
    w: true, 
    h: true, 
    class: true, 
    confidence: true,
})

const DetectionUpdateSchema = DetectionSchema.pick({
    x: true,
    y: true,
    w: true,
    h: true,
    class: true,
    confidence: true,
}).partial()

//

type DetectionSchema = z.infer<typeof DetectionSchema>
type DetectionQuerySchema = z.infer<typeof DetectionQuerySchema>
type DetectionCreateSchema = z.infer<typeof DetectionCreateSchema>
type DetectionUpdateSchema = z.infer<typeof DetectionUpdateSchema>

//

export { DetectionSchema, DetectionQuerySchema, DetectionCreateSchema, DetectionUpdateSchema }
