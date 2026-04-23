import { Op } from "sequelize";
import { WsEvent, WsEventHandler } from "@/schemas/ws.event.schema.js";
import { Reading } from "@/models/reading.model.js";
import { Sensor } from "@/models/sensor.model.js";
import { Threshold } from "@/models/threshold.model.js";
import { Condition } from "@/models/condition.model.js";
import { ReadingCreateSchema } from "@/schemas/reading.schema.js";
import appWebsocket from "@/websockets/app.websocket.js";
import thresholdModule from "@/modules/threshold.module.js";
import conditionModule from "@/modules/condition.module.js";
import { Action } from "@/models/action.model.js";
import { Actuator } from "@/models/actuator.model.js";
import actionModule from "@/modules/action.module.js";

//

const onCreateReading: WsEventHandler<ReadingCreateSchema & { tag: string }> = async (data) => {
    // --- Map tags to sensors
    const tags = data.map(s => s.tag)
    const sensors = await Sensor.findAll({ where: { tag: { [Op.in]: tags } }, raw: true })
    const mapped = data.map(d => ({ ...d, sensorId: sensors.find(s => s.tag == d.tag)?.id as number | undefined }))
    const filtered = mapped.filter(m => !!m.sensorId) as (ReadingCreateSchema & { sensorId: number })[]

    // --- Create readings from mapped sensorId
    const readings = await Reading.bulkCreate(filtered, { returning: true })
    const values = readings.map((r) => r.dataValues)
    const event: WsEvent = { name: "Reading", query: "Create", data: values }
    await appWebsocket.broadcast(event)

    // --- Get thresholds and conditions for evaluation
    const sids = sensors.map(s => s.id)
    const thresholds = await Threshold.findAll({ where: { sensorId: { [Op.in]: sids } }, raw: true })
    const tids = thresholds.map(t => t.id)
    const conditions = await Condition.findAll({ where: { thresholdId: { [Op.in]: tids } }, raw: true })

    // --- Map readings, thresholds, and conditions
    const rwtmapped = readings.map(r => ({ ...r, threshold: thresholds.find(t => t.sensorId == r.sensorId) }))
    const rwtfiltered = rwtmapped.filter(r => !!r.threshold)
    const rwtwcmapped = rwtfiltered.map(r => ({ ...r, conditions: conditions.filter(c => c.thresholdId == r.threshold!.id) }))

    // --- Evaluate thresholds and conditions
    const tprms = rwtwcmapped.map(r => thresholdModule.evaluate(r.threshold!, r.conditions, r.value))
    const cprms = rwtwcmapped.map(r => r.conditions.map(c => conditionModule.evaluate(c, r.value))).flat()
    await Promise.all([tprms, cprms].flat()).catch(console.error)

    // --- Evaluate thresholds without side effect
    const evaluated = rwtwcmapped.map(r => ({ ...r.threshold, activated: thresholdModule.evaluate(r.threshold!, r.conditions, r.value) }))
    const activated = evaluated.filter(e => e.activated)

    // --- Get actions and actuators of the activated thresholds
    const atids = activated.map(a => a.id as number)
    const actions = await Action.findAll({ where: { thresholdId: { [Op.in]: atids } }, raw: true })
    const aids = actions.map(a => a.actuatorId)
    const actuators = await Actuator.findAll({ where: { id: { [Op.in]: aids } }, raw: true })
    
    // --- Invoke actions with actuators
    const aamapped = actions.map(a => ({ ...a, actuator: actuators.find(at => at.id == a.actuatorId) }))
    await Promise.all(aamapped.map(a => actionModule.execute(a, a.actuator!))).catch(console.error)
}

//

export default { onCreateReading }
