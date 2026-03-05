import env from "@/config/env.config.js"
import espHandler from "@/handlers/esp.handler.js"
import espWebsocket from "@/websockets/esp.websocket.js"

//

const boot = async () => {
    if (!env.boot.esp) return console.info(`Esp boot skipped.`)
    await espWebsocket.subscribe("Reading", "Create", espHandler.onCreateReading)
    console.info("Esp request handlers attached.")
}

//

export default { boot }
