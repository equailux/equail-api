import express from "express"
import powerController from "@/modules/power/power.controller.js"
import powerInterruptionRoute from "@/modules/power/interruption/power.interruption.route.js"

//

const router = express.Router()
router.post("/", powerController.post)
router.use("/interruption", powerInterruptionRoute.router)

//

export default { router }
