import env from "@/config/env.config.js"
import { Options, Sequelize } from "sequelize"
import { Capture, captureAttributes, captureOptions, } from "@/models/capture.model.js"
import { Detection, detectionAttributes, detectionOptions } from "@/models/detection.model.js"
import { Mortality, mortalityAttributes, mortalityOptions } from "@/models/mortality.model.js"
import { Reading, readingAttributes, readingOptions } from "@/models/reading.model.js"
import { User, userAttributes, userOptions } from "@/models/user.model.js"
import { Otp, otpAttributes, otpOptions } from "@/models/otp.model.js"
import { Settings, settingsAttributes, settingsOptions } from "@/models/settings.model.js"
import { Remark, remarkAttributes, remarkOptions } from "@/models/remark.model.js"

//

const boot = async () => {
    const { user, pass, host, port, name, dialect, certificate } = env.database
    const url = `${dialect}://${user}:${pass}@${host}:${port}`

    const rawsqlize = new Sequelize(url, { logging: false })
    await rawsqlize.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`)
    console.info("Database connected and checked.")

    const ca = Buffer.from(certificate ?? "", "base64").toString()
    const options: Options = { ...(!!certificate && { dialectOptions: { ssl: { ca } } }) }
    const sequelize = new Sequelize(`${url}/${name}`, { ...options, logging: false })

    Capture.init(captureAttributes, captureOptions(sequelize))
    Detection.init(detectionAttributes, detectionOptions(sequelize))
    Mortality.init(mortalityAttributes, mortalityOptions(sequelize))
    Otp.init(otpAttributes, otpOptions(sequelize))
    Reading.init(readingAttributes, readingOptions(sequelize))
    User.init(userAttributes, userOptions(sequelize))
    Settings.init(settingsAttributes, settingsOptions(sequelize))
    Remark.init(remarkAttributes, remarkOptions(sequelize))

    Capture.hasMany(Detection, { foreignKey: "captureId", onDelete: "CASCADE" })
    Capture.hasMany(Remark, { foreignKey: "captureId", onDelete: "CASCADE" })
    Detection.belongsTo(Capture, { as: "capture", foreignKey: "captureId" })
    Remark.belongsTo(Capture, { as: "capture", foreignKey: "captureId" })

    await sequelize.authenticate()
    const { sync, alter, force } = env.database
    if (sync) await sequelize.sync({ alter, force })
    if (sync) console.info("Database synced successfully.")
}

//

export default { boot }
