import express from "express"
import sensorRoute from "@/modules/sensors/sensor.route.js"
import actuatorRoute from "@/modules/actuators/actuator.route.js"
import thresholdRoute from "@/modules/thresholds/threshold.route.js"

//

const router = express.Router()
router.use("/sensor", sensorRoute.router)
router.use("/actuator", actuatorRoute.router)
router.use("/threshold", thresholdRoute.router)

//

export default { router }
