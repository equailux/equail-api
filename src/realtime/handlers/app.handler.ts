import { WsEventHandler } from "@/realtime/schemas/ws.event.schema.js";
import { Settings } from "@/modules/settings/settings.model.js";
import { SettingsUpdateSchema } from "@/modules/settings/settings.schema.js";

//

const onUpdateSettings: WsEventHandler<SettingsUpdateSchema> = async (data) => {
    if (data.length <= 0) return

    const updatable = data.at(0)!
    const defaults = {
        allowEnvironmentAlerts: true,
        ...updatable,
    }

    const [settings] = await Settings.findOrCreate({ where: {}, defaults })
    await settings.update(updatable)
}

//

export default { onUpdateSettings }
