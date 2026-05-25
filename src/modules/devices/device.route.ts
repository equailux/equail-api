import express from "express"
import deviceController from "@/modules/devices/device.controller.js"

//

const router = express.Router()
router.post("/", deviceController.post)

//

export default { router }
