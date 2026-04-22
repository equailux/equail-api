import express from "express"
import conditionController from "@/controllers/condition.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", conditionController.get)
router.patch("/:cid", conditionController.patch)
router.delete("/:cid", conditionController.destroy)

//

export default { router }
