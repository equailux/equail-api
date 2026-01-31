import express from "express"
import captureRoute from "./capture.route.js"
import mortalityRoute from "./mortality.route.js"
import readingRoute from "./reading.route.js"
import jwtMiddleware from "../middlewares/jwt.middleware.js"

//

const router = express.Router()
router.use(jwtMiddleware.requireAuthToken)
router.use("/capture", captureRoute.router)
router.use("/mortality", mortalityRoute.router)
router.use("/reading", readingRoute.router)

//

export default { router }
