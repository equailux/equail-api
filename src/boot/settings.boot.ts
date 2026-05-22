import env from "@/config/env.config.js"
import { Settings } from "@/modules/settings/settings.model.js"
import { SettingsCreateSchema } from "@/modules/settings/settings.schema.js"

//

const boot = async () => {
    if (!env.boot.settings) return console.info(`Settings boot skipped.`)
    const data: SettingsCreateSchema = { allowEnvironmentAlerts: true }
    const [_, created] = await Settings.findOrCreate({ where: {}, defaults: data, raw: true })
    console.info(`Settings ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
