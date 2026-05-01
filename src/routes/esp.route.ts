import express from "express"
import espMiddleware from "@/middlewares/esp.middleware.js"
import uploadMiddleware from "@/middlewares/upload.middleware.js"
import captureController from "@/controllers/capture.controller.js"
import detectionController from "@/controllers/detection.controller.js"

//

const router = express.Router()
router.use(espMiddleware.match)
router.post("/capture", uploadMiddleware.upload.single("image"), captureController.post)
router.post("/capture/:cid/detection", detectionController.post)

//

export default { router }
