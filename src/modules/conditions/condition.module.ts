import { Condition } from "@/modules/conditions/condition.model.js"
import { ConditionSchema } from "@/modules/conditions/condition.schema.js"
import { Threshold } from "@/modules/thresholds/threshold.model.js"
import { Sensor } from "@/modules/sensors/sensor.model.js"
import { Settings } from "@/modules/settings/settings.model.js"
import { User } from "@/modules/auth/user.model.js"
import env from "@/config/env.config.js"
import appWebsocket from "@/realtime/websockets/app.websocket.js"
import mailService from "@/shared/services/mail.service.js"

//

// --- Main
const evaluate = async (condition: ConditionSchema, value: number) => {
	const satisfied = isSatisfied(condition, value)
	const current = await Condition.findByPk(condition.id, { attributes: ["satisfied"], raw: true })
	const updated = { ...condition, satisfied }

	await Condition.update(updated, { where: { id: condition.id } })
	await appWebsocket.broadcast({ name: "Condition", data: [updated], query: "Update" })

	if (satisfied && !(current?.satisfied ?? condition.satisfied))
		await notifyUsers(updated, value).catch(console.error)
	return satisfied
}

const notifyUsers = async (condition: ConditionSchema, value: number) => {
	if (!env.boot.mail) return

	const [settings] = await Settings.findOrCreate({ where: { id: 1 } })
	if (!settings.allowEnvironmentAlerts) return

	const users = await User.findAll({ attributes: ["email"], raw: true })
	const emails = users.map(user => user.email).filter(Boolean)
	if (!emails.length) return

	const threshold = await Threshold.findByPk(condition.thresholdId, { raw: true })
	const sensor = threshold ? await Sensor.findByPk(threshold.sensorId, { attributes: ["name"], raw: true }) : null

	const subject = threshold ? `${threshold.name} - Condition Satisfied` : "Condition Satisfied"
	const text = [
		threshold?.message,
		`${sensor?.name ?? "Sensor"} read ${value}, which is ${describe(condition)}.`,
		`Recorded at ${new Date().toLocaleString()}.`,
	]
		.filter(Boolean)
		.join("\n\n")

	await mailService.sendMail({ to: env.gmail.address, bcc: emails, subject, text })
}

// --- Utilities
const isSatisfied = (condition: ConditionSchema, value: number) => {
	const { output, operator } = condition
	let satisfied = operator == "<" && value < output
	satisfied = satisfied || (operator == "=" && value == output)
	satisfied = satisfied || (operator == ">" && value > output)
	return satisfied
}

const describe = (condition: ConditionSchema) => {
	const { output, operator } = condition
	const phrase = operator == "<" ? "below" : operator == ">" ? "above" : "equal to"
	return `${phrase} ${output}`
}

//

export default { evaluate, isSatisfied }
