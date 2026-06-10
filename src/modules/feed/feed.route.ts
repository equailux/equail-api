import express from "express"
import feedController from "@/modules/feed/feed.controller.js"
import feedConfigController from "@/modules/feed/config/feed.config.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/config", feedConfigController.get)
router.patch("/config", feedConfigController.patch)
router.post("/test", feedController.test)
router.get("/", feedController.get)
router.post("/", feedController.post)
router.patch("/:fid", feedController.patch)
router.delete("/:fid", feedController.destroy)

//

export default { router }
