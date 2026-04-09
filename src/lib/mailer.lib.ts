import env from "@/config/env.config.js"
import nodemailer from "nodemailer"

//

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: env.gmail.address,
        pass: env.gmail.password,
    },
})

//

export default { transporter }
