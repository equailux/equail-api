import express from "express"
import env from "#config/env.config.js"

//

const app = express()

//

app.get("/", (req, res) => res.send("Hello World!"))
app.listen(env.port, env.host, () => console.log(`Api active on http://${env.host}:${env.port}.`))
