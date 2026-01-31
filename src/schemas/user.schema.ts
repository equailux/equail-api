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

const UserSafeSchema = UserSchema.omit({ password: true })
const UserQuerySchema = UserSchema.partial()
const UserSignInSchema = UserSchema.pick({ email: true, password: true })
const UserChangeNameSchema = UserSchema.pick({ name: true })
const UserResetPasswordSchema = UserSchema.pick({ email: true })
const UserChangePasswordSchema = UserSchema.pick({ password: true }).and(z.object({ token: z.jwt() }))

//

type UserSchema = z.infer<typeof UserSchema>
type UserSafeSchema = z.infer<typeof UserSafeSchema>
type UserQuerySchema = z.infer<typeof UserQuerySchema>
type UserSignInSchema = z.infer<typeof UserSignInSchema>
type UserChangeNameSchema = z.infer<typeof UserChangeNameSchema>
type UserResetPasswordSchema = z.infer<typeof UserResetPasswordSchema>
type UserChangePasswordSchema = z.infer<typeof UserChangePasswordSchema>

//

export {
    UserSchema, 
    UserSafeSchema, 
    UserQuerySchema, 
    UserSignInSchema, 
    UserChangeNameSchema, 
    UserResetPasswordSchema,
    UserChangePasswordSchema,
}
