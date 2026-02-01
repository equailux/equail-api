import { onCreateReading } from "../handlers/esp.handler.js"
import { ReadingCreateSchema } from "../schemas/reading.schema.js"
import espWebsocket from "../websockets/esp.websocket.js"

//

const boot = async () => {
    await espWebsocket.respond<ReadingCreateSchema>("c:reading", onCreateReading)
    console.info("Esp request handlers attached.")
}

//

export default { boot }
