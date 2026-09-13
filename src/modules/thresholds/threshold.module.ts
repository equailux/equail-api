import { Device } from "@/modules/devices/device.model.js"
import { Threshold } from "@/modules/thresholds/threshold.model.js"
import { ConditionSchema } from "@/modules/conditions/condition.schema.js"
import { ThresholdSchema } from "@/modules/thresholds/threshold.schema.js"
import { Settings } from "@/modules/settings/settings.model.js"
import conditionModule from "@/modules/conditions/condition.module.js"
import appWebsocket from "@/realtime/websockets/app.websocket.js"
import firebaseService from "@/shared/services/firebase.service.js"

//

// --- Main
const evaluate = async (threshold: ThresholdSchema, conditions: ConditionSchema[], value: number) => {
	const satisfied = isSatisfied(threshold, conditions, value)
	const current = await Threshold.findByPk(threshold.id, { attributes: ["activated"], raw: true })
	const updated = { ...threshold, activated: satisfied }

	await Threshold.update(updated, { where: { id: threshold.id } })
	await appWebsocket.broadcast({ name: "Threshold", data: [updated], query: "Update" })

	if (satisfied && !(current?.activated ?? threshold.activated)) await notifyUsers(updated).catch(console.error)
	return satisfied
}

const notifyUsers = async (threshold: ThresholdSchema) => {
	const [settings] = await Settings.findOrCreate({ where: { id: 1 } })
	if (!settings.allowEnvironmentAlerts) return

	const devices = await Device.findAll({ attributes: ["token"], raw: true })
	const tokens = devices.map(device => device.token).filter(Boolean)
	if (!tokens.length) return

	await firebaseService.fcm.sendEachForMulticast({ tokens, notification: { title: threshold.name, body: threshold.message } })
}

// --- Utilities
const isSatisfied = (threshold: ThresholdSchema, conditions: ConditionSchema[], value: number) => {
	const { operator } = threshold
	const bits = conditions.map(c => conditionModule.isSatisfied(c, value))
	return operator == "All" ? bits.every(b => b) : bits.some(b => b)
}

//

export default { evaluate, isSatisfied }
