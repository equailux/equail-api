import { Op } from "sequelize"
import { WsEvent, WsEventHandler } from "@/realtime/schemas/ws.event.schema.js"
import { Reading } from "@/modules/readings/reading.model.js"
import { Sensor } from "@/modules/sensors/sensor.model.js"
import { Threshold } from "@/modules/thresholds/threshold.model.js"
import { Condition } from "@/modules/conditions/condition.model.js"
import { ReadingCreateSchema } from "@/modules/readings/reading.schema.js"
import appWebsocket from "@/realtime/websockets/app.websocket.js"
import thresholdModule from "@/modules/thresholds/threshold.module.js"
import conditionModule from "@/modules/conditions/condition.module.js"
import { Action } from "@/modules/actions/action.model.js"
import { Actuator } from "@/modules/actuators/actuator.model.js"
import actionModule from "@/modules/actions/action.module.js"
import systemErrorService, { type ReadingPayload } from "@/modules/system-error/system-error.service.js"
import { Power } from "@/modules/power/power.model.js"
import { PowerCreateSchema } from "@/modules/power/power.schema.js"
import powerService from "@/modules/power/power.service.js"
import { PowerInterruptionCreateSchema } from "@/modules/power/interruption/power.interruption.schema.js"
import powerInterruptionService from "@/modules/power/interruption/power.interruption.service.js"
import z from "zod"

//

const onCreateReading: WsEventHandler<ReadingCreateSchema & { tag: string }> = async data => {
	const raw = data as ReadingPayload[]
	const nullReadings = raw.filter(reading => reading.value === null)
	const validReadings = raw.filter(reading => reading.value !== null)

	if (nullReadings.length) await systemErrorService.logNullReadings(nullReadings).catch(console.error)
	if (!validReadings.length) return

	// --- Map tags to sensors
	const parsed = z.array(ReadingCreateSchema.loose()).parse(validReadings) as (ReadingCreateSchema & { tag: string })[]
	const tags = parsed.map(s => s.tag)
	const sensors = await Sensor.findAll({ where: { tag: { [Op.in]: tags } }, raw: true })
	const mapped = parsed.map(d => ({ ...d, sensorId: sensors.find(s => s.tag.toLowerCase() == d.tag.toLowerCase())?.id as number | undefined }))
	const filtered = mapped.filter(m => !!m.sensorId) as (ReadingCreateSchema & { sensorId: number })[]

	// --- Create readings from mapped sensorId
	const readings = await Reading.bulkCreate(filtered, { returning: true })
	const values = readings.map(r => r.dataValues)
	const event: WsEvent = { name: "Reading", query: "Create", data: values }
	await appWebsocket.broadcast(event)

	// --- Get thresholds and conditions for evaluation
	const sids = sensors.map(s => s.id)
	const thresholds = await Threshold.findAll({ where: { sensorId: { [Op.in]: sids } }, raw: true })
	const tids = thresholds.map(t => t.id)
	const conditions = await Condition.findAll({ where: { thresholdId: { [Op.in]: tids } }, raw: true })

	// --- Map readings, thresholds, and conditions
	// Note: map over `values` (dataValues), not the model instances. Spreading a Sequelize
	// instance copies its internals, not its attributes, so `r.value` would be undefined.
	const rwtmapped = values.map(r => ({ ...r, threshold: thresholds.find(t => t.sensorId == r.sensorId) }))
	const rwtfiltered = rwtmapped.filter(r => !!r.threshold)
	const rwtwcmapped = rwtfiltered.map(r => ({
		...r,
		conditions: conditions.filter(c => c.thresholdId == r.threshold!.id),
	}))

	// --- Evaluate thresholds and conditions
	const tprms = rwtwcmapped.map(async r => ({ ...r.threshold, activated: await thresholdModule.evaluate(r.threshold!, r.conditions, r.value) }))
	const cprms = rwtwcmapped.map(r => r.conditions.map(c => conditionModule.evaluate(c, r.value))).flat()

	const [evaluated] = await Promise.all([Promise.all(tprms), Promise.all(cprms).catch(console.error)])

	// --- Keep only the thresholds that just turned on. `thresholds` was read before
	// evaluation, so it still holds the previous state. Filtering on `activated` alone
	// re-fires the actions on every reading for as long as the threshold stays on, which
	// re-arms the action duration over and over.
	const activated = evaluated.filter(e => e.activated && !thresholds.find(t => t.id == e.id)?.activated)

	// --- Get actions and actuators of the activated thresholds
	const atids = activated.map(a => a.id as number)
	const actions = await Action.findAll({ where: { thresholdId: { [Op.in]: atids } }, raw: true })
	const aids = actions.map(a => a.actuatorId)
	const actuators = await Actuator.findAll({ where: { id: { [Op.in]: aids } }, raw: true })

	// --- Invoke actions with actuators
	const aamapped = actions.map(a => ({ ...a, actuator: actuators.find(at => at.id == a.actuatorId) }))
	await Promise.all(aamapped.map(a => actionModule.execute(a, a.actuator!))).catch(console.error)
}

const onCreatePower: WsEventHandler<PowerCreateSchema> = async data => {
	if (!data.length) return

	const parsed = z.array(PowerCreateSchema).parse(data)
	const powers = await Power.bulkCreate(parsed, { returning: true })
	const values = powers.map(power => power.dataValues)

	await appWebsocket.broadcast({ name: "Power", query: "Create", data: values })
	await Promise.all(powers.map(power => powerService.evaluate(power.level)))
}

const onCreatePowerInterruption: WsEventHandler<PowerInterruptionCreateSchema> = async data => {
	if (!data.length) return

	const parsed = z.array(PowerInterruptionCreateSchema).parse(data)
	const powerInterruptions = []

	for (const interruption of parsed) {
		const powerInterruption = await powerInterruptionService.evaluate(interruption.powered)
		powerInterruptions.push(powerInterruption.dataValues)
	}

	await appWebsocket.broadcast({ name: "PowerInterruption", query: "Create", data: powerInterruptions })
}

//

export default { onCreateReading, onCreatePower, onCreatePowerInterruption }
