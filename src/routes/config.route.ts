import express from "express"
import espRoute from "@/routes/esp.route.js"

//

const router = express.Router()
router.use("/esp", espRoute.router)

//

export default { router }
