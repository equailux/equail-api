import env from "src/config/env.config.js"
import cloudflaredService from "src/services/cloudflared.service.js"
import mailService from "src/services/mail.service.js"

//

const boot = async () => {
    await cloudflaredService.connect()
    const url = cloudflaredService.getUrl()
    
    const { email } = env.dev
    const subject = "E-Quail Cloudflare Tunnel"
    const text = `E-Quail api available at ${url}.`
    await mailService.sendMail({ to: email, subject, text })
}

//

export default { boot }
