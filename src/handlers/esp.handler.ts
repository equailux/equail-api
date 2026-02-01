import { Reading } from "../models/reading.model.js";
import { ReadingCreateSchema } from "../schemas/reading.schema.js";
import appWebsocket from "../websockets/app.websocket.js";

//

const onCreateReading = async (data: ReadingCreateSchema) => {
    const reading = await Reading.create(data, { raw: true })
    const msg = { cmd: "c:reading", ...reading }
    await appWebsocket.broadcast(JSON.stringify(msg))
}

//

export { onCreateReading }
