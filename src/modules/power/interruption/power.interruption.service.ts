import { Device } from "@/modules/devices/device.model.js"
import { PowerInterruption } from "@/modules/power/interruption/power.interruption.model.js"
import firebaseService from "@/shared/services/firebase.service.js"

//

let evaluationQueue = Promise.resolve()

//

const evaluate = (powered: boolean) => {
	const evaluation = evaluationQueue.then(() => createAndNotify(powered))
	evaluationQueue = evaluation.then(() => undefined, () => undefined)
	return evaluation
}

const createAndNotify = async (powered: boolean) => {
	const previous = await PowerInterruption.findOne({
		attributes: ["powered"],
		order: [
			["createdAt", "DESC"],
			["id", "DESC"],
		],
		raw: true,
	})
	
	const powerInterruption = await PowerInterruption.create({ powered })
	if (previous?.powered === powered) return powerInterruption

	if (powered && previous) await notifyUsers("Power Restored", "Power has been restored.").catch(console.error)
	if (!powered) await notifyUsers("Power Interruption", "Power has been interrupted.").catch(console.error)

	return powerInterruption
}

const notifyUsers = async (title: string, body: string) => {
	const devices = await Device.findAll({ attributes: ["token"], raw: true })
	const tokens = devices.map(device => device.token).filter(Boolean)
	if (!tokens.length) return

	await firebaseService.fcm.sendEachForMulticast({ tokens, notification: { title, body } })
}

//

export default { evaluate }
