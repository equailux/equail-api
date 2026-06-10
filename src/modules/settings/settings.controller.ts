import { Settings } from "@/modules/settings/settings.model.js"
import { SettingsCreateSchema, SettingsUpdateSchema } from "@/modules/settings/settings.schema.js"
import { type RequestHandler } from "express"

//

const get: RequestHandler = async (req, res, next) => {
    const [settings] = await Settings.findOrCreate({ where: { id: 1 } })
    res.send(settings)
}

const post: RequestHandler = async (req, res, next) => {
    const { data, error, success } = SettingsCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const [settings] = await Settings.findOrCreate({ where: { id: 1 }, defaults: data })
    res.send(settings)
}

const patch: RequestHandler = async (req, res, next) => {
    const { data, error, success } = SettingsUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const [settings] = await Settings.findOrCreate({ where: { id: 1 } })
    await settings.update(data)
    res.send(settings)
}

//

export default { get, post, patch }
