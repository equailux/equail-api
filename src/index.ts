import express from "express"
import http from "http"
import env from "./config/env.config.js"
import admin from "./boot/admin.boot.js"
import database from "./boot/database.boot.js"
import apiRoute from "./routes/api.route.js"
import authRoute from "./routes/auth.route.js"
import mail from "./boot/mail.boot.js"
import cloudflared from "./boot/cloudflared.boot.js"
import websocketService from "./services/websocket.service.js"
import settings from "./boot/settings.boot.js"

//

const app = express()

await database.boot()
await settings.boot()
await admin.boot()
await mail.boot()
await cloudflared.boot()

//

app.use("/api", apiRoute.router)
app.use("/auth", authRoute.router)

const server = http.createServer(app)
server.on("upgrade", websocketService.connect)
server.listen(env.port, env.host, () => console.log(`Api active on ${env.protocol}://${env.host}:${env.port}.`))
