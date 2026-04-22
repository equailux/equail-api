import { WsEvent, WsEventHandler } from "@/schemas/ws.event.schema.js";
import { Reading } from "@/models/reading.model.js";
import { ReadingCreateSchema } from "@/schemas/reading.schema.js";
import appWebsocket from "@/websockets/app.websocket.js";
import { Sensor } from "@/models/sensor.model.js";
import { Op } from "sequelize";

//

const onCreateReading: WsEventHandler<ReadingCreateSchema & { tag: string }> = async (data) => {
    const tags = data.map(s => s.tag)
    const sensors = await Sensor.findAll({ where: { tag: { [Op.in]: tags } }, raw: true })
    const mapped = data.map(d => ({ ...d, sensorId: sensors.find(s => s.tag == d.tag)?.id as number | undefined }))
    const filtered = mapped.filter(m => !!m.sensorId) as (ReadingCreateSchema & { sensorId: number })[]

    const readings = await Reading.bulkCreate(filtered)
    const values = readings.map((r) => r.dataValues)
    const event: WsEvent = { name: "Reading", query: "Create", data: values }
    await appWebsocket.broadcast(event)
}

//

export default { onCreateReading }
