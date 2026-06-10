import express from "express"
import settingsController from "@/modules/settings/settings.controller.js"
import authMiddleware from "@/modules/auth/auth.middleware.js"

//

const router = express.Router()
router.use(authMiddleware.requireAuth)
router.get("/", settingsController.get)
router.post("/", settingsController.post)
router.patch("/", settingsController.patch)

//

export default { router }
