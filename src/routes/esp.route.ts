import express from "express"
import espController from "@/controllers/esp.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", espController.get)
router.post("/", espController.post)
router.patch("/:eid", espController.patch)
router.delete("/:eid", espController.destroy)

//

export default { router }
