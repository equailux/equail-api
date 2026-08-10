import nodemailer, { SendMailOptions } from "nodemailer"

//

let transporter = undefined as ReturnType<typeof nodemailer.createTransport> | undefined

//

const connect = async (address: string, password: string) => {
    return;
    // transporter = nodemailer.createTransport({
    //     auth: { user: address, pass: password },
    //     secure: true,
    //     service: "gmail",
    // })
    
    // await transporter.verify()
    // return transporter
}

const sendMail = async (options: SendMailOptions) => {
    return;
    // if (!transporter) throw new Error("Mail transporter is not initialized.")
    // return await transporter.sendMail(options)
}

//

export default { connect, sendMail }
