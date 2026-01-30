import express from "express"
import captureController from "../controllers/capture.controller.js"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", captureController.post)
router.patch("/:id", captureController.patch)
router.delete("/:id", captureController.destroy)

//

export default { router }
