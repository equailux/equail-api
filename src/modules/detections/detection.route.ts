import express from "express"
import detectionController from "@/modules/detections/detection.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", detectionController.get)
router.patch("/:did", detectionController.patch)
router.delete("/:did", detectionController.destroy)

//

export default { router }
