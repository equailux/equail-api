import env from "@/config/env.config.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mailService from "@/services/mail.service.js";
import { Otp } from "@/models/otp.model.js";
import { User } from "@/models/user.model.js";
import { RequestHandler } from "express";
import { OtpDigitsSchema } from "@/schemas/otp.schema.js";
import {
    UserChangeNameSchema,
    UserChangePasswordSchema,
    UserResetPasswordSchema,
    UserSafeSchema,
    UserSignInSchema
} from "@/schemas/user.schema.js";

//

const signIn: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserSignInSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const user = await User.findOne({ where: { email: data.email }, raw: true })
    if (!user) return res.status(400).send("Incorrect credentials provided.")

    const matched = await bcrypt.compare(data.password, user.password)
    if (!matched) return res.status(400).send("Incorrect credentials provided.")

    const payload = UserSafeSchema.parse(user)
    const token = jwt.sign(payload, env.jwt.signInSecret, { expiresIn: "1Hour" })
    res.send({ user: payload, token })
}

const signOut: RequestHandler = async (req, res, next) => {
    if (!req.user) return res.status(401).send("Authorization is required.")
    res.status(204).send("Kindly remove credentials.")
}

const changeName: RequestHandler = async (req, res, next) => {
    if (!req.user) return res.status(401).send("Authorization is required.")

    const { data, error, success } = UserChangeNameSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const [count] = await User.update(data, { where: { id: req.user.id } })
    if (count <= 0) return res.status(404).send("User not found.")
    res.status(204).send("User name changed.")
}

const resetPassword: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserResetPasswordSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const user = await User.findOne({ where: { email: data.email }, raw: true })
    if (!user) return res.status(400).send("Incorrect credentials provided.")

    const digits = (Math.random() * 999999).toFixed(0).padStart(6, "0")
    const expiry = Date.now() + 15 * 60 * 1000
    await Otp.create({ digits, revoked: false, expiredAt: new Date(expiry) })

    const text = `Your otp is ${digits}.`
    const subject = "OTP - E-Quail"
    await mailService.sendMail({ to: user.email, subject, text })

    res.status(204).send("Kindly check your email for 6-digit otp.")
}

const changePassword: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserChangePasswordSchema.and(OtpDigitsSchema).safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const otp = await Otp.findOne({ where: { digits: data.digits } })
    if (!otp) return res.status(400).send("Incorrect otp provided.")

    const expired = Date.now() > new Date(otp.expiredAt).getTime()
    if (expired) return res.status(400).send("Otp provided is expired.")
    if (otp.revoked) return res.status(400).send("Otp has already been used.")

    const password = await bcrypt.hash(data.password, 10)
    const [count] = await User.update({ password }, { where: { email: data.email } })
    await otp.update({ revoked: true })

    if (count <= 0) return res.status(404).send("User not found.")
    res.status(204).send("Password changed successfully.")
}

//

export default { signIn, signOut, changeName, resetPassword, changePassword }
