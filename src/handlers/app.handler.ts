import { WsEventHandler } from "../schemas/ws.event.schema.js";
import { Settings } from "../models/settings.model.js";
import { SettingsUpdateSchema } from "../schemas/settings.model.js";

//

const onUpdateSettings: WsEventHandler<SettingsUpdateSchema> = async (data) => {
    if (data.length <= 0) return

    const updatable = data.at(0)!
    const defaults = {
        allowPushNotifications: true,
        allowLowFeedAlerts: true,
        allowLowWaterAlerts: true,
        allowEnvironmentAlerts: true,
        ...updatable,
    }

    const [settings] = await Settings.findOrCreate({ where: {}, defaults })
    await settings.update(updatable)
}

//

export default { onUpdateSettings }
