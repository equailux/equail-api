import express from "express"
import captureRoute from "@/routes/capture.route.js"
import mortalityRoute from "@/routes/mortality.route.js"
import readingRoute from "@/routes/reading.route.js"
import jwtMiddleware from "@/middlewares/jwt.middleware.js"

//

const router = express.Router()
router.use(jwtMiddleware.requireAuthToken)
router.use("/capture", captureRoute.router)
router.use("/mortality", mortalityRoute.router)
router.use("/reading", readingRoute.router)

//

export default { router }
