import express from "express"
import readingController from "@/controllers/reading.controller.js"

//

const router = express.Router()
router.get("/", readingController.get)

//

export default { router }
