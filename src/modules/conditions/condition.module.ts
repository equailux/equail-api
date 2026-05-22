import { Condition } from "@/modules/conditions/condition.model.js";
import { ConditionSchema } from "@/modules/conditions/condition.schema.js";
import appWebsocket from "@/realtime/websockets/app.websocket.js";

//

// --- Main
const evaluate = async (condition: ConditionSchema, value: number) => {
    const satisfied = isSatisfied(condition, value)
    const updated = { ...condition, satisfied }

    await Condition.update(updated, { where: { id: condition.id } })
    await appWebsocket.broadcast({ name: "Condition", data: [updated], query: "Update" })

    return satisfied
}

// --- Utilities
const isSatisfied = (condition: ConditionSchema, value: number) => {
    const { output, operator } = condition
    let satisfied = operator == "<" && value < output
    satisfied = satisfied || operator == "=" && value == output
    satisfied = satisfied || operator == ">" && value > output
    return satisfied
}

//

export default { evaluate, isSatisfied } 
