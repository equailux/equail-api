import env from "@/config/env.config.js"
import mailService from "@/services/mail.service.js"

//

const boot = async () => {
    const { address, password } = env.gmail
    await mailService.connect(address, password)
    console.info("Mail connected successfully.")
}

//

export default { boot }
