import { setTimeout } from "timers/promises"
import { ActionSchema } from "@/schemas/action.schema.js";
import { ActuatorSchema } from "@/schemas/actuator.schema.js";
import { Actuator } from "@/models/actuator.model.js";
import espWebsocket from "@/websockets/esp.websocket.js";
import appWebsocket from "@/websockets/app.websocket.js";

//

// --- Main
const execute = async (action: ActionSchema, actuator: ActuatorSchema) => {
    await setTimeout(Math.max(0, action.delay))
    
    const updated = { ...actuator, input: action.input }
    await Actuator.update(updated, { where: { id: actuator.id } })
    
    await espWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
    await appWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
    
    if (action.duration < 0) return
    await setTimeout(Math.max(0, action.duration))
    
    updated.input = actuator.input
    await Actuator.update(updated, { where: { id: actuator.id } })
    
    await espWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
    await appWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
}

//

export default { execute }
