import { Reading } from "src/models/reading.model.js";
import { ReadingCreateSchema } from "src/schemas/reading.schema.js";
import appWebsocket from "src/websockets/app.websocket.js";

//

const onCreateReading = async (data: ReadingCreateSchema) => {
    const reading = await Reading.create(data, { raw: true })
    const msg = { cmd: "c:reading", ...reading }
    await appWebsocket.broadcast(JSON.stringify(msg))
}

//

export { onCreateReading }
