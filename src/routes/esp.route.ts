import express from "express"
import espController from "@/controllers/esp.controller.js"
import sensorController from "@/controllers/sensor.controller.js"
import sensorRoute from "@/routes/sensor.route.js"
import actuatorRoute from "@/routes/actuator.route.js"
import actuatorController from "@/controllers/actuator.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", espController.get)
router.post("/", espController.post)
router.patch("/:eid", espController.patch)
router.delete("/:eid", espController.destroy)

router.use("/sensor", sensorRoute.router)
router.post("/:eid/sensor", sensorController.post)

router.use("/actuator", actuatorRoute.router)
router.post("/:eid/actuator", actuatorController.post)

//

export default { router }
