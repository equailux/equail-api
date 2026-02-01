import appHandler from "../handlers/app.handler.js"
import appWebsocket from "../websockets/app.websocket.js"

//

const boot = async () => {
    appWebsocket.subscribe("Settings", "Update", appHandler.onUpdateSettings)
    console.info("App request handlers attached.")
}

//

export default { boot }
