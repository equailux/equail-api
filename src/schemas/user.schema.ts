import z from "zod";

//

const UserSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const UserQuerySchema = UserSchema.partial()
const UserCreateSchema = UserSchema.pick({ name: true, email: true, password: true })
const UserUpdateSchema = UserSchema.pick({ name: true, email: true, password: true }).partial()

//

type UserSchema = z.infer<typeof UserSchema>
type UserQuerySchema = z.infer<typeof UserQuerySchema>
type UserCreateSchema = z.infer<typeof UserCreateSchema>
type UserUpdateSchema = z.infer<typeof UserUpdateSchema>

//

export { UserSchema, UserQuerySchema, UserCreateSchema, UserUpdateSchema }
