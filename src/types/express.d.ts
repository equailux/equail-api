import { UserSafeSchema } from "src/schemas/user.schema.ts";

//

declare global {
    namespace Express {
        interface Request {
            user?: UserSafeSchema
        }
    }
}

//

export {}
