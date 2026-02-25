import { Settings } from "@/models/settings.model.js"
import { SettingsCreateSchema } from "@/schemas/settings.model.js"

//

const boot = async () => {
    const data: SettingsCreateSchema = { allowEnvironmentAlerts: true }
    const [_, created] = await Settings.findOrCreate({ where: {}, defaults: data, raw: true })
    console.info(`Settings ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
