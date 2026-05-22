import express from "express"
import actionController from "@/modules/actions/action.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", actionController.get)
router.patch("/:aid", actionController.patch)
router.delete("/:aid", actionController.destroy)

//

export default { router }
