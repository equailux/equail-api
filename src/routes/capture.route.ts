import express from "express"
import captureController from "@/controllers/capture.controller.js"
import detectionRoute from "@/routes/detection.route.js"
import uploadMiddleware from "@/middlewares/upload.middleware.js"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", uploadMiddleware.upload.single("image"), captureController.post)
router.patch("/:cid", captureController.patch)
router.delete("/:cid", captureController.destroy)
router.use("/:cid/detection", detectionRoute.router)

//

export default { router }
