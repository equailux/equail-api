import express from "express"
import captureController from "@/controllers/capture.controller.js"
import detectionRoute from "@/routes/detection.route.js"
import uploadMiddleware from "@/middlewares/upload.middleware.js"
import remarkRoute from "@/routes/remark.route.js"
import remarkController from "@/controllers/remark.controller.js"
import detectionController from "@/controllers/detection.controller.js"

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
