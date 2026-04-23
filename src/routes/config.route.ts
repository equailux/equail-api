import express from "express"
import sensorRoute from "@/routes/sensor.route.js"
import actuatorRoute from "@/routes/actuator.route.js"
import thresholdRoute from "@/routes/threshold.route.js"

//

const router = express.Router()
router.use("/sensor", sensorRoute.router)
router.use("/actuator", actuatorRoute.router)
router.use("/threshold", thresholdRoute.router)

//

export default { router }
