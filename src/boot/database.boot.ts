import env from "@/config/env.config.js"
import { Options, Sequelize } from "sequelize"
import { Capture, captureAttributes, captureOptions } from "@/modules/captures/capture.model.js"
import { Collection, collectionAttributes, collectionOptions } from "@/modules/collection/collection.model.js"
import { Detection, detectionAttributes, detectionOptions } from "@/modules/detections/detection.model.js"
import { Mortality, mortalityAttributes, mortalityOptions } from "@/modules/mortalities/mortality.model.js"
import { Reading, readingAttributes, readingOptions } from "@/modules/readings/reading.model.js"
import { User, userAttributes, userOptions } from "@/modules/auth/user.model.js"
import { Settings, settingsAttributes, settingsOptions } from "@/modules/settings/settings.model.js"
import { Account, accountAttributes, accountOptions } from "@/modules/auth/account.model.js"
import { Session, sessionAttributes, sessionOptions } from "@/modules/auth/session.model.js"
import { Verification, verificationAttributes, verificationOptions } from "@/modules/auth/verification.model.js"
import { Threshold, thresholdAttributes, thresholdOptions } from "@/modules/thresholds/threshold.model.js"
import { Sensor, sensorAttributes, sensorOptions } from "@/modules/sensors/sensor.model.js"
import { Actuator, actuatorAttributes, actuatorOptions } from "@/modules/actuators/actuator.model.js"
import { Action, actionAttributes, actionOptions } from "@/modules/actions/action.model.js"
import { Condition, conditionAttributes, conditionOptions } from "@/modules/conditions/condition.model.js"
import { Feed, feedAttributes, feedOptions } from "@/modules/feed/feed.model.js"
import { FeedConfig, feedConfigAttributes, feedConfigOptions } from "@/modules/feed/config/feed.config.model.js"
import { Device, deviceAttributes, deviceOptions } from "@/modules/devices/device.model.js"
import { Power, powerAttributes, powerOptions } from "@/modules/power/power.model.js"
import { SystemError, systemErrorAttributes, systemErrorOptions } from "@/modules/system-error/system-error.model.js"
import {
	PowerInterruption,
	powerInterruptionAttributes,
	powerInterruptionOptions,
} from "@/modules/power/interruption/power.interruption.model.js"

//

const boot = async () => {
	if (!env.boot.database) return console.info(`Database boot skipped.`)
	const { user, pass, host, port, name, dialect, certificate } = env.database
	const url = `${dialect}://${user}:${pass}@${host}:${port}`

	const rawsqlize = new Sequelize(url, { logging: false })
	await rawsqlize.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`)
	console.info("Database connected and checked.")

	const ca = Buffer.from(certificate ?? "", "base64").toString()
	const options: Options = { ...(!!certificate && { dialectOptions: { ssl: { ca } } }) }
	const sequelize = new Sequelize(`${url}/${name}`, { ...options, logging: false })

	// --- Better-Auths
	User.init(userAttributes, userOptions(sequelize))
	Account.init(accountAttributes, accountOptions(sequelize))
	Session.init(sessionAttributes, sessionOptions(sequelize))
	Verification.init(verificationAttributes, verificationOptions(sequelize))

	User.hasMany(Account, { foreignKey: "userId", onDelete: "CASCADE" })
	User.hasMany(Session, { foreignKey: "userId", onDelete: "CASCADE" })
	Account.belongsTo(User, { as: "user", foreignKey: "userId" })
	Session.belongsTo(User, { as: "user", foreignKey: "userId" })

	// --- Models & Assocs
	Action.init(actionAttributes, actionOptions(sequelize))
	Actuator.init(actuatorAttributes, actuatorOptions(sequelize))
	Capture.init(captureAttributes, captureOptions(sequelize))
	Collection.init(collectionAttributes, collectionOptions(sequelize))
	Condition.init(conditionAttributes, conditionOptions(sequelize))
	Detection.init(detectionAttributes, detectionOptions(sequelize))
	Device.init(deviceAttributes, deviceOptions(sequelize))
	Feed.init(feedAttributes, feedOptions(sequelize))
	FeedConfig.init(feedConfigAttributes, feedConfigOptions(sequelize))
	Mortality.init(mortalityAttributes, mortalityOptions(sequelize))
	Power.init(powerAttributes, powerOptions(sequelize))
	PowerInterruption.init(powerInterruptionAttributes, powerInterruptionOptions(sequelize))
	Reading.init(readingAttributes, readingOptions(sequelize))
	Sensor.init(sensorAttributes, sensorOptions(sequelize))
	Settings.init(settingsAttributes, settingsOptions(sequelize))
	SystemError.init(systemErrorAttributes, systemErrorOptions(sequelize))
	Threshold.init(thresholdAttributes, thresholdOptions(sequelize))

	Action.belongsTo(Actuator, { as: "actuator", foreignKey: "actuatorId" })
	Action.belongsTo(Threshold, { as: "threshold", foreignKey: "thresholdId" })
	Actuator.hasMany(Action, { foreignKey: "actuatorId", onDelete: "CASCADE" })
	Capture.hasMany(Detection, { foreignKey: "captureId", onDelete: "CASCADE" })
	Condition.belongsTo(Threshold, { as: "threshold", foreignKey: "thresholdId" })
	Detection.belongsTo(Capture, { as: "capture", foreignKey: "captureId" })
	Detection.hasMany(Feed, { foreignKey: "detectionId", onDelete: "SET NULL" })
	Device.belongsTo(User, { as: "user", foreignKey: "userId" })
	Feed.belongsTo(Detection, { as: "detection", foreignKey: "detectionId" })
	Reading.belongsTo(Sensor, { as: "sensor", foreignKey: "sensorId" })
	Sensor.hasMany(Reading, { foreignKey: "sensorId", onDelete: "CASCADE" })
	Sensor.hasMany(Threshold, { foreignKey: "sensorId", onDelete: "CASCADE" })
	Threshold.belongsTo(Sensor, { as: "sensor", foreignKey: "sensorId" })
	Threshold.hasMany(Action, { foreignKey: "thresholdId", onDelete: "CASCADE" })
	Threshold.hasMany(Condition, { foreignKey: "thresholdId", onDelete: "CASCADE" })
	User.hasMany(Device, { foreignKey: "userId", onDelete: "CASCADE" })

	await sequelize.authenticate()
	const { sync, alter, force } = env.database
	if (sync) await sequelize.sync({ alter, force })
	if (sync) console.info("Database synced successfully.")
}

//

export default { boot }
