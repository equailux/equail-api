import { UserSafeSchema } from "@/modules/auth/user.schema.ts";

//

declare global {
    namespace Express {
        interface Request {
            user?: UserSafeSchema
            session?: Session
        }
    }
}

//

export { }
