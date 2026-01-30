import express from "express"
import env from "./config/env.config.js"
import admin from "./boot/admin.boot.js"
import database from "./boot/database.boot.js"
import apiRoute from "./routes/api.route.js"

//

const app = express()

await database.boot()
await admin.boot()

//

app.use("/api", apiRoute.router)

app.listen(env.port, env.host, () => console.log(`Api active on http://${env.host}:${env.port}.`))
