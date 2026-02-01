import { Settings } from "../models/settings.model.js";
import { SettingsUpdateSchema } from "../schemas/settings.model.js";

//

const onUpdateSettings = async (data: SettingsUpdateSchema) => {
    const defaults = {
        allowPushNotifications: true,
        allowLowFeedAlerts: true,
        allowLowWaterAlerts: true,
        allowEnvironmentAlerts: true,
        ...data,
    }

    const [settings] = await Settings.findOrCreate({ where: {}, defaults })
    await settings.update(data)
}

//

export default { onUpdateSettings }
