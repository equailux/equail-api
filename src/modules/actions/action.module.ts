import { setTimeout } from "timers/promises"
import { ActionSchema } from "@/modules/actions/action.schema.js";
import { ActuatorSchema } from "@/modules/actuators/actuator.schema.js";
import { Actuator } from "@/modules/actuators/actuator.model.js";
import espWebsocket from "@/realtime/websockets/esp.websocket.js";
import appWebsocket from "@/realtime/websockets/app.websocket.js";

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
