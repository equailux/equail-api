import mailerLib from "@/lib/mailer.lib.js";
import { User } from "better-auth";

//

const onSendResetPassword = async ({ user, url, token }: { user: User, url: string, token: string }) => {
    await mailerLib.transporter.sendMail({
        to: [user.email],
        subject: "Reset Password",
        html: `${url}`,
    })
}

//

export default { onSendResetPassword }
