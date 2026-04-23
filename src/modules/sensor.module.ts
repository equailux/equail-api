import { Sensor } from "@/models/sensor.model.js";
import { SensorSchema } from "@/schemas/sensor.schema.js";
import espWebsocket from "@/websockets/esp.websocket.js";

//

// --- Main
const loop = async () => {
    const sensors = await Sensor.findAll({ raw: true, attributes: ["id", "tag",] })
    const readables = sensors.filter(s => Date.now() - s.lastread >= s.interval)
    await Promise.all(readables.map(r => read(r)))
}

// --- Utilities
const read = async (sensor: SensorSchema) => {
    await Sensor.update({ lastread: Date.now() }, { where: { id: sensor.id } })
    await espWebsocket.broadcast({ name: "Reading", data: [sensor], query: "Retrieve" })
}

//

export default { read, loop }
