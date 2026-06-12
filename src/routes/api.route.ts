import express from "express"
import captureRoute from "@/modules/captures/capture.route.js"
import collectionRoute from "@/modules/collection/collection.route.js"
import mortalityRoute from "@/modules/mortalities/mortality.route.js"
import readingRoute from "@/modules/readings/reading.route.js"
import feedRoute from "@/modules/feed/feed.route.js"
import configRoute from "@/routes/config.route.js"
import authMiddleware from "@/modules/auth/auth.middleware.js"
import deviceRoute from "@/modules/devices/device.route.js"
import powerRoute from "@/modules/power/power.route.js"
import settingsRoute from "@/modules/settings/settings.route.js"
import systemErrorRoute from "@/modules/system-error/system-error.route.js"

//

const router = express.Router()
router.use(authMiddleware.requireAuth)
router.use("/capture", captureRoute.router)
router.use("/collection", collectionRoute.router)
router.use("/mortality", mortalityRoute.router)
router.use("/reading", readingRoute.router)
router.use("/feed", feedRoute.router)
router.use("/config", configRoute.router)
router.use("/device", deviceRoute.router)
router.use("/power", powerRoute.router)
router.use("/settings", settingsRoute.router)
router.use("/system-error", systemErrorRoute.router)

//

export default { router }
