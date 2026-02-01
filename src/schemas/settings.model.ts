import z from "zod";

//

const SettingsSchema = z.object({
    id: z.coerce.number().int(),
    allowPushNotifications: z.boolean().default(true),
    allowLowFeedAlerts: z.boolean().default(true),
    allowLowWaterAlerts: z.boolean().default(true),
    allowEnvironmentAlerts: z.boolean().default(true),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const SettingsQuerySchema = SettingsSchema.partial()
const SettingsCreateSchema = SettingsSchema.omit({ id: true, createdAt: true, updatedAt: true })
const SettingsUpdateSchema = SettingsSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial()

//

type SettingsSchema = z.infer<typeof SettingsSchema>
type SettingsQuerySchema = z.infer<typeof SettingsQuerySchema>
type SettingsCreateSchema = z.infer<typeof SettingsCreateSchema>
type SettingsUpdateSchema = z.infer<typeof SettingsUpdateSchema>

//

export { SettingsSchema, SettingsQuerySchema, SettingsCreateSchema, SettingsUpdateSchema }
