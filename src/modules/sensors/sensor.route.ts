import express from "express"
import sensorController from "@/modules/sensors/sensor.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", sensorController.get)
router.post("/", sensorController.post)
router.patch("/:sid", sensorController.patch)
router.delete("/:sid", sensorController.destroy)

//

export default { router }
