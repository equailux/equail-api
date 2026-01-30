import express from "express"
import env from "./config/env.config.js"
import database from "./boot/database.boot.js"
import captureRoute from "./routes/capture.route.js"
import detectionRoute from "./routes/detection.route.js"
import mortalityRoute from "./routes/mortality.route.js"
import readingRoute from "./routes/reading.route.js"

//

const app = express()
await database.boot()

//

app.use(express.json())
app.use("/capture", captureRoute.router)
app.use("/detection", detectionRoute.router)
app.use("/mortality", mortalityRoute.router)
app.use("/reading", readingRoute.router)

app.listen(env.port, env.host, () => console.log(`Api active on http://${env.host}:${env.port}.`))
