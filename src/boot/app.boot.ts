import appHandler from "../handlers/app.handler.js"
import { SettingsUpdateSchema } from "../schemas/settings.model.js"
import appWebsocket from "../websockets/app.websocket.js"

//

const boot = async () => {
    appWebsocket.respond<SettingsUpdateSchema>("u:settings", appHandler.onUpdateSettings)
    console.info("App request handlers attached.")
}

//

export default { boot }
