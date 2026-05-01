import z from "zod"

//

const PaginationSchema = z.object({
    alpha: z.coerce.date().optional(),          // Start Date
    omega: z.coerce.date().optional(),          // End Date
    limit: z.coerce.number().int().default(1000), // Max Items
    total: z.coerce.number().int().default(0),  // Total Count of Items
    offset: z.coerce.number().int().default(0), // Count of Skipped Items
})

//

type PaginationSchema = z.infer<typeof PaginationSchema>

//

export { PaginationSchema }
