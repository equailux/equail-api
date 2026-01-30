import z from "zod";

//

const DetectionSchema = z.object({
    id: z.coerce.number().int(),
    x1: z.coerce.number(),
    y1: z.coerce.number(),
    x2: z.coerce.number(),
    y2: z.coerce.number(),
    label: z.string().min(1),
    confidence: z.coerce.number(),
    captureId: z.coerce.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const DetectionCreateSchema = DetectionSchema.pick({
    x1: true, 
    y1: true, 
    x2: true, 
    y2: true, 
    label: true, 
    confidence: true,
})

const DetectionUpdateSchema = DetectionSchema.pick({
    x1: true,
    y1: true,
    x2: true,
    y2: true,
    label: true,
    confidence: true,
}).partial()

//

type DetectionSchema = z.infer<typeof DetectionSchema>
type DetectionCreateSchema = z.infer<typeof DetectionCreateSchema>
type DetectionUpdateSchema = z.infer<typeof DetectionUpdateSchema>

//

export { DetectionSchema, DetectionCreateSchema, DetectionUpdateSchema }
