import express from "express"
import powerInterruptionController from "@/modules/power/interruption/power.interruption.controller.js"

//

const router = express.Router()
router.post("/", powerInterruptionController.post)

//

export default { router }
