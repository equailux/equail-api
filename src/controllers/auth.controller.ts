import env from "../config/env.config.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { RequestHandler } from "express";
import { User } from "../models/user.model.js";
import {
    UserChangeNameSchema,
    UserChangePasswordSchema,
    UserResetPasswordSchema,
    UserSafeSchema,
    UserSignInSchema
} from "../schemas/user.schema.js";

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
    res.send({ user, token })
}

const signOut: RequestHandler = async (req, res, next) => {
    res.status(204).send("Kindly remove credentials.")
}

const changeName: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserChangeNameSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const [count] = await User.update(data, { where: {} })
    if (count <= 0) return res.status(404).send("User not found.")
    res.status(204).send("User name changed.")
}

const resetPassword: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserResetPasswordSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const user = await User.findOne({ where: { email: data.email }, raw: true })
    if (!user) return res.status(400).send("Incorrect credentials provided.")

    const payload = UserSafeSchema.parse(user)
    const token = jwt.sign(payload, env.jwt.resetPasswordSecret, { expiresIn: "1Hour" })
    res.status(204).send("Kindly check your email for reset link.")

    // --- Email link with token
}

const changePassword: RequestHandler = async (req, res, next) => {
    const { data, error, success } = UserChangePasswordSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const payload = await Promise
        .resolve()
        .then(() => jwt.verify(data.token, env.jwt.resetPasswordSecret) as UserSafeSchema)
        .catch(() => undefined)
    if (payload == undefined) return res.status(400).send("Invalid token provided.")

    const user = await User.findByPk(payload.id)
    if (!user) return res.status(404).send("User not found.")

    const password = await bcrypt.hash(data.password, 10)
    await user.update({ password })
    res.status(204).send("Password sent successfully.")
}

//

export default { signIn, signOut, changeName, resetPassword, changePassword }
