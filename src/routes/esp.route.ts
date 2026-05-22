import express from "express"
import espMiddleware from "@/shared/middlewares/esp.middleware.js"
import uploadMiddleware from "@/shared/middlewares/upload.middleware.js"
import captureController from "@/modules/captures/capture.controller.js"
import detectionController from "@/modules/detections/detection.controller.js"

//

const router = express.Router()
router.use(espMiddleware.match)
router.post("/capture", uploadMiddleware.upload.single("image"), captureController.post)
router.post("/capture/:cid/detection", detectionController.post)

//

export default { router }
