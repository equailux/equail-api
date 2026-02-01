import espHandler from "../handlers/esp.handler.js"
import espWebsocket from "../websockets/esp.websocket.js"

//

const boot = async () => {
    await espWebsocket.subscribe("Reading", "Create", espHandler.onCreateReading)
    console.info("Esp request handlers attached.")
}

//

export default { boot }
