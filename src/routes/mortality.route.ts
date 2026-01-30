import express from "express"
import mortalityController from "../controllers/mortality.controller.js"

//

const router = express.Router()
router.get("/", mortalityController.get)
router.post("/", mortalityController.post)
router.patch("/:id", mortalityController.patch)
router.delete("/:id", mortalityController.destroy)

//

export default { router }
