import express from "express"
import actuatorController from "@/modules/actuators/actuator.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", actuatorController.get)
router.post("/", actuatorController.post)
router.patch("/:aid", actuatorController.patch)
router.delete("/:aid", actuatorController.destroy)

//

export default { router }
