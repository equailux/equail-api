import { Sensor } from "@/modules/sensors/sensor.model.js";
import { SensorSchema } from "@/modules/sensors/sensor.schema.js";
import espWebsocket from "@/realtime/websockets/esp.websocket.js";

//

// --- Main
const loop = async () => {
    const sensors = await Sensor.findAll({ raw: true, attributes: ["id", "tag", "interval", "lastread"] })
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
