import express from "express"
import readingController from "@/modules/readings/reading.controller.js"

//

const router = express.Router()
router.get("/", readingController.get)

//

export default { router }
