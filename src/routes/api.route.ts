import express from "express"
import captureRoute from "./capture.route.js"
import mortalityRoute from "./mortality.route.js"
import readingRoute from "./reading.route.js"
import jwtMiddleware from "../middlewares/jwt.middleware.js"
import logMiddleware from "../middlewares/log.middleware.js"

//

const router = express.Router()
router.use(express.json())
router.use(logMiddleware.log)
router.use(jwtMiddleware.requireAuthToken)
router.use("/capture", captureRoute.router)
router.use("/mortality", mortalityRoute.router)
router.use("/reading", readingRoute.router)

//

export default { router }
