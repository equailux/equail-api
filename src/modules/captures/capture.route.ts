import express from "express"
import captureController from "@/modules/captures/capture.controller.js"
import detectionRoute from "@/modules/detections/detection.route.js"
import uploadMiddleware from "@/shared/middlewares/upload.middleware.js"
import detectionController from "@/modules/detections/detection.controller.js"
import captureConfigController from "@/modules/captures/config/capture.config.controller.js"

//

const router = express.Router()
router.get("/config", captureConfigController.get)
router.patch("/config", captureConfigController.patch)
router.post("/trigger", captureController.trigger)
router.get("/", captureController.get)
router.post("/", uploadMiddleware.upload.single("image"), captureController.post)
router.patch("/:cid", captureController.patch)
router.delete("/:cid", captureController.destroy)
router.get("/image/:filename", captureController.getImage)

router.use("/detection", detectionRoute.router)
router.post("/:cid/detection", detectionController.post)

//

export default { router }
