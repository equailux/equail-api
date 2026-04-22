import express from "express"
import thresholdController from "@/controllers/threshold.controller.js"
import conditionRoute from "@/routes/condition.route.js"
import conditionController from "@/controllers/condition.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", thresholdController.get)
router.post("/sensor/:sid", thresholdController.post)
router.patch("/:tid", thresholdController.patch)
router.delete("/:tid", thresholdController.destroy)

router.use("/condition", conditionRoute.router)
router.post("/:tid/condition", conditionController.post)

//

export default { router }
