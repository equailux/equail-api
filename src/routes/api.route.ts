import express from "express"
import cors from "cors"
import captureRoute from "@/routes/capture.route.js"
import mortalityRoute from "@/routes/mortality.route.js"
import readingRoute from "@/routes/reading.route.js"
import jwtMiddleware from "@/middlewares/jwt.middleware.js"
import logMiddleware from "@/middlewares/log.middleware.js"
import env from "@/config/env.config.js"

//

const router = express.Router()
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(logMiddleware.log)
router.use(jwtMiddleware.requireAuthToken)
router.use(express.static(`${process.cwd()}/${env.multer.path}`))
router.use("/capture", captureRoute.router)
router.use("/mortality", mortalityRoute.router)
router.use("/reading", readingRoute.router)

//

export default { router }
