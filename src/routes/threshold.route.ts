import express from "express"
import thresholdController from "@/controllers/threshold.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", thresholdController.get)
router.patch("/:tid", thresholdController.patch)
router.delete("/:tid", thresholdController.destroy)

//

export default { router }
