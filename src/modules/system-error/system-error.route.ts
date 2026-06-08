import express from "express"
import systemErrorController from "@/modules/system-error/system-error.controller.js"

//

const router = express.Router()
router.get("/", systemErrorController.get)

//

export default { router }
