import { User } from "@/modules/auth/user.model.js"
import env from "@/config/env.config.js"
import cloudflaredService from "@/shared/services/cloudflared.service.js"
import mailService from "@/shared/services/mail.service.js"



const boot = async () => {
    if (!env.boot.cloudflared) return console.info(`Cloudflared boot skipped.`)
    const { protocol, host, port } = env
    await cloudflaredService.connect(`${protocol}://${host}:${port}`)
    const url = cloudflaredService.getUrl()
    console.info(`Cloudflared connected on ${url}.`)

    const body = JSON.stringify({ target: url })
    const headers = { "Content-Type": "application/json" }
    await fetch(`${env.proxy.url}/target`, { method: "POST", body, headers })
        .then(async (res) => { if (!res.ok) throw new Error(await res.text()) })
    console.info(`Cloudflared url sent to proxy.`)

    const { email } = env.dev
    const subject = "E-Quail Cloudflare Tunnel"
    const text = `E-Quail api available at ${url}.`
    await mailService.sendMail({ to: email, subject, text })
    console.info(`Cloudflared url mailed to admin.`)
}



export default { boot }
