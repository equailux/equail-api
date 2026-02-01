import express from "express"
import authController from "../controllers/auth.controller.js"
import jwtMiddleware from "../middlewares/jwt.middleware.js"
import logMiddleware from "src/middlewares/log.middleware.js"

//

const router = express.Router()
router.use(express.json())
router.use(logMiddleware.log)
router.post("/sign-in", authController.signIn)
router.post("/sign-out", jwtMiddleware.requireAuthToken, authController.signOut)
router.post("/change-name", jwtMiddleware.requireAuthToken, authController.changeName)
router.post("/reset-password", authController.resetPassword)
router.post("/change-password", authController.changePassword)

//

export default { router }
