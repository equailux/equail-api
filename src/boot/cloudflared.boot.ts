import { User } from "@/models/user.model.js"
import env from "@/config/env.config.js"
import cloudflaredService from "@/services/cloudflared.service.js"
import mailService from "@/services/mail.service.js"



const boot = async () => {
    if (!env.boot.cloudflared) return console.info(`Cloudflared boot skipped.`)
    const { protocol, host, port } = env
    await cloudflaredService.connect(`${protocol}://${host}:${port}`)
    const url = cloudflaredService.getUrl()
    console.info(`Cloudflared connected on ${url}.`)

    const user = await User.findOne({ where: {} }) as User
    const body = JSON.stringify({ url, hash: user.password, email: user.email })
    const headers = { "Content-Type": "application/json" }
    await fetch(`${env.proxy.url}/api`, { method: "POST", body, headers })
        .then(async (res) => { if (!res.ok) throw new Error(await res.text()) })
    console.info(`Cloudflared url sent to proxy.`)

    const { email } = env.dev
    const subject = "E-Quail Cloudflare Tunnel"
    const text = `E-Quail api available at ${url}.`
    await mailService.sendMail({ to: email, subject, text })
    console.info(`Cloudflared url mailed to admin.`)
}



export default { boot }
