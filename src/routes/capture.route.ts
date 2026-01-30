import express from "express"
import captureController from "../controllers/capture.controller.js"
import detectionRoute from "./detection.route.js"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", captureController.post)
router.patch("/:id", captureController.patch)
router.delete("/:id", captureController.destroy)
router.use("/detection", detectionRoute.router)

//

export default { router }
