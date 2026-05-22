import env from "@/config/env.config.js";
import mailerLib from "@/shared/lib/mailer.lib.js";
import { User } from "better-auth";

//

const onSendResetPassword = async ({ user, url, token }: { user: User, url: string, token: string }) => {
    const furl = new URL(url)
    const link = `${env.proxy.url}${furl.pathname}?callbackURL=${furl.searchParams.get("callbackURL")}`
        
    await mailerLib.transporter.sendMail({
        to: [user.email],
        subject: "Reset Password",
        text: link,
    })
}

//

export default { onSendResetPassword }
