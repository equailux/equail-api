import authLib from "@/lib/auth.lib.js"
import { RequestHandler } from "express"

//

const requireAuth: RequestHandler = async (req, res, next) => {
    if (req.user && req.session) return next()

    const session = await authLib.api.getSession({ headers: req.headers })
    if (!session) return res.status(401).send("Authorization required.")

    req.user = session.user
    req.session = session.session
    next()
}

//

export default { requireAuth }
