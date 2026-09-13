import { setTimeout } from "timers/promises"
import { ActionSchema } from "@/modules/actions/action.schema.js";
import { ActuatorSchema } from "@/modules/actuators/actuator.schema.js";
import { Actuator } from "@/modules/actuators/actuator.model.js";
import espWebsocket from "@/realtime/websockets/esp.websocket.js";
import appWebsocket from "@/realtime/websockets/app.websocket.js";

//

// --- State
const running = new Set<number>()

//

// --- Main
const execute = async (action: ActionSchema, actuator: ActuatorSchema) => {
    // Only one run per actuator at a time. Without this, anything that re-invokes the
    // action while it is still holding (a second threshold, a manual trigger, a retry)
    // starts another timer, and the overlapping runs keep the actuator open well past
    // the configured duration.
    if (running.has(actuator.id)) return
    running.add(actuator.id)

    try {
        await setTimeout(Math.max(0, action.delay))

        // Read the resting input at execute time. The caller's copy was fetched before
        // the delay elapsed, so restoring from it can write back a value another run
        // already changed, which leaves the actuator latched on.
        const current = await Actuator.findByPk(actuator.id, { attributes: ["input"], raw: true })
        const resting = current?.input ?? actuator.input

        await apply(actuator, action.input)

        if (action.duration < 0) return
        await setTimeout(Math.max(0, action.duration))

        await apply(actuator, resting)
    } finally {
        running.delete(actuator.id)
    }
}

// --- Utilities
const apply = async (actuator: ActuatorSchema, input: number) => {
    const updated = { ...actuator, input }

    await Actuator.update(updated, { where: { id: actuator.id } })
    await espWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
    await appWebsocket.broadcast({ name: "Actuator", data: [updated], query: "Update" })
}

//

export default { execute }
