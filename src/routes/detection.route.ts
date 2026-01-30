import express from "express"
import detectionController from "../controllers/detection.controller.js"

//

const router = express.Router()
router.get("/", detectionController.get)
router.post("/", detectionController.post)
router.patch("/:id", detectionController.patch)
router.delete("/:id", detectionController.destroy)

//

export default { router }
