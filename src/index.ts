import express from "express"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import authLib from "@/lib/auth.lib.js"
import { toNodeHandler } from "better-auth/node"
import logMiddleware from "@/middlewares/log.middleware.js"
import env from "@/config/env.config.js"
import admin from "@/boot/admin.boot.js"
import database from "@/boot/database.boot.js"
import apiRoute from "@/routes/api.route.js"
import authRoute from "@/routes/auth.route.js"
import mail from "@/boot/mail.boot.js"
import cloudflared from "@/boot/cloudflared.boot.js"
import websocketService from "@/services/websocket.service.js"
import settings from "@/boot/settings.boot.js"
import esp from "@/boot/esp.boot.js"
import app from "@/boot/app.boot.js"
import cloudinary from "@/boot/cloudinary.boot.js"

//

const api = express()

await database.boot()
await settings.boot()
await admin.boot()
await mail.boot()
await cloudflared.boot()
await cloudinary.boot()
await esp.boot()
await app.boot()

//

api.use(logMiddleware.log)
api.use(cors({ origin: env.cors.origins, credentials: true }))
api.all("/api/auth/*splat", toNodeHandler(authLib))
api.use(cookieParser())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.get("/", (_, res) => res.send("I am api only."))
api.use("/api", apiRoute.router)
api.use("/auth", authRoute.router)

const server = http.createServer(api)
server.on("upgrade", websocketService.connect)
server.listen(env.port, env.host, () => console.log(`Api active on ${env.protocol}://${env.host}:${env.port}.`))
