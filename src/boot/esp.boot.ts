import { onCreateReading } from "src/handlers/esp.handler.js"
import { ReadingCreateSchema } from "src/schemas/reading.schema.js"
import espWebsocket from "src/websockets/esp.websocket.js"

//

const boot = async () => {
    await espWebsocket.respond<ReadingCreateSchema>("c:reading", onCreateReading)
    console.info("Esp request handlers attached.")
}

//

export default { boot }
