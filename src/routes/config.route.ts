import express from "express"
import espRoute from "@/routes/esp.route.js"
import thresholdRoute from "@/routes/threshold.route.js"

//

const router = express.Router()
router.use("/esp", espRoute.router)
router.use("/threshold", thresholdRoute.router)

//

export default { router }
