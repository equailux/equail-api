import express from "express"
import espMiddleware from "@/shared/middlewares/esp.middleware.js"
import uploadMiddleware from "@/shared/middlewares/upload.middleware.js"
import captureController from "@/modules/captures/capture.controller.js"
import detectionController from "@/modules/detections/detection.controller.js"
import feedController from "@/modules/feed/feed.controller.js"
import captureConfigController from "@/modules/captures/config/capture.config.controller.js"

//

const router = express.Router()
router.use(espMiddleware.match)
router.get("/capture/config", captureConfigController.get)
router.post("/capture", uploadMiddleware.upload.single("image"), captureController.post)
router.post("/capture/:cid/detection", detectionController.post)
router.post("/feed", feedController.post)

//

export default { router }
