import express from "express"
import captureController from "@/modules/captures/capture.controller.js"
import detectionRoute from "@/modules/detections/detection.route.js"
import uploadMiddleware from "@/shared/middlewares/upload.middleware.js"
import remarkRoute from "@/modules/remarks/remark.route.js"
import remarkController from "@/modules/remarks/remark.controller.js"
import detectionController from "@/modules/detections/detection.controller.js"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", uploadMiddleware.upload.single("image"), captureController.post)
router.patch("/:cid", captureController.patch)
router.delete("/:cid", captureController.destroy)
router.get("/image/:filename", captureController.getImage)

router.use("/remark", remarkRoute.router)
router.post("/:cid/remark", remarkController.post)

router.use("/detection", detectionRoute.router)
router.post("/:cid/detection", detectionController.post)

//

export default { router }
