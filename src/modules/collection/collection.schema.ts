import z from "zod"

//

const CollectionSchema = z.object({
	id: z.coerce.number().int(),
	count: z.coerce.number().int(),
	collectAt: z.coerce.date(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})

const CollectionQuerySchema = CollectionSchema.partial()
const CollectionCreateSchema = CollectionSchema.pick({ count: true, collectAt: true })
const CollectionUpdateSchema = CollectionSchema.pick({ count: true, collectAt: true }).partial()

//

type CollectionSchema = z.infer<typeof CollectionSchema>
type CollectionQuerySchema = z.infer<typeof CollectionQuerySchema>
type CollectionCreateSchema = z.infer<typeof CollectionCreateSchema>
type CollectionUpdateSchema = z.infer<typeof CollectionUpdateSchema>

//

export { CollectionSchema, CollectionQuerySchema, CollectionCreateSchema, CollectionUpdateSchema }
