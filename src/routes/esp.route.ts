import express from "express"
import espController from "@/controllers/esp.controller.js"
import sensorController from "@/controllers/sensor.controller.js"
import sensorRoute from "@/routes/sensor.route.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", espController.get)
router.post("/", espController.post)
router.patch("/:eid", espController.patch)
router.delete("/:eid", espController.destroy)

router.use("/sensor", sensorRoute.router)
router.post("/:eid/sensor", sensorController.post)

//

export default { router }
