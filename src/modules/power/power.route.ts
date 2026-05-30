import express from "express"
import powerController from "@/modules/power/power.controller.js"

//

const router = express.Router()
router.post("/", powerController.post)

//

export default { router }
