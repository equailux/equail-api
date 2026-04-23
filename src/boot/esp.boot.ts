import env from "@/config/env.config.js"
import espHandler from "@/handlers/esp.handler.js"
import sensorModule from "@/modules/sensor.module.js"
import espWebsocket from "@/websockets/esp.websocket.js"

//

const boot = async () => {
    if (!env.boot.esp) return console.info(`Esp boot skipped.`)
    await espWebsocket.subscribe("Reading", "Create", espHandler.onCreateReading)
    setInterval(() => sensorModule.loop().catch(console.error), 500)
    console.info("Esp request handlers attached.")
}

//

export default { boot }
