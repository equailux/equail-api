import { Device } from "@/modules/devices/device.model.js"
import firebaseService from "@/shared/services/firebase.service.js"

//

const THRESHOLD = 25

//

const evaluate = async (level: number) => {
	const satisfied = isSatisfied(level)
	if (satisfied) await notifyUsers(level).catch(console.error)
	return satisfied
}

const notifyUsers = async (level: number) => {
	const devices = await Device.findAll({ attributes: ["token"], raw: true })
	const tokens = devices.map(device => device.token).filter(Boolean)
	if (!tokens.length) return

	const title = "Power Supply Low"
	const body = `Power level is ${level}%, at or below ${THRESHOLD}%.`
	await firebaseService.fcm.sendEachForMulticast({ tokens, notification: { title, body }})
}

//

const isSatisfied = (level: number) => Number(level) <= THRESHOLD

//

export default { evaluate, isSatisfied }
