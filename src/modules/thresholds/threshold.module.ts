import { Threshold } from "@/modules/thresholds/threshold.model.js";
import { ConditionSchema } from "@/modules/conditions/condition.schema.js";
import { ThresholdSchema } from "@/modules/thresholds/threshold.schema.js";
import conditionModule from "@/modules/conditions/condition.module.js";
import appWebsocket from "@/realtime/websockets/app.websocket.js";

//

// --- Main
const evaluate = async (threshold: ThresholdSchema, conditions: ConditionSchema[], value: number) => {
    const satisfied = isSatisfied(threshold, conditions, value)
    const updated = { ...threshold, activated: satisfied }
    
    await Threshold.update(updated, { where: { id: threshold.id } })
    await appWebsocket.broadcast({ name: "Threshold", data: [updated], query: "Update" })
    
    return satisfied
}

// --- Utilities
const isSatisfied = (threshold: ThresholdSchema, conditions: ConditionSchema[], value: number) => {
    const { operator } = threshold
    const bits = conditions.map(c => conditionModule.isSatisfied(c, value))
    return operator == "All" ? bits.every(b => b) : bits.some(b => b)
}

//

export default { evaluate, isSatisfied }
