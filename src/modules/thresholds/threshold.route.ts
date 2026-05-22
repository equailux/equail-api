import express from "express"
import thresholdController from "@/modules/thresholds/threshold.controller.js"
import conditionRoute from "@/modules/conditions/condition.route.js"
import conditionController from "@/modules/conditions/condition.controller.js"
import actionController from "@/modules/actions/action.controller.js"
import actionRoute from "@/modules/actions/action.route.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", thresholdController.get)
router.post("/sensor/:sid", thresholdController.post)
router.patch("/:tid", thresholdController.patch)
router.delete("/:tid", thresholdController.destroy)

router.use("/condition", conditionRoute.router)
router.post("/:tid/condition", conditionController.post)

router.use("/action", actionRoute.router)
router.post("/:tid/action/actuator/:aid", actionController.post)

//

export default { router }
