import envConfig from "@/config/env.config.js"
import authHook from "@/hooks/auth.hook.js"
import { BaseURLConfig, betterAuth } from "better-auth"
import { createPool } from "mysql2/promise"

//

const { user, pass, host, port, name, certificate } = envConfig.database
const ca = Buffer.from(certificate || "", "base64").toString()

const pool = createPool({
    host: host,
    port: port,
    user: user,
    password: pass,
    database: name,
    timezone: "Z",
    ...(!!certificate && { ssl: { ca } }),
})

const baseUrl = envConfig.self || `${envConfig.protocol}://${envConfig.host}:${envConfig.port}`
const allowedHosts = [baseUrl, ...envConfig.cors.origins].map(o => new URL(o).host).filter(Boolean)

const baseURL: BaseURLConfig = {
    allowedHosts,
    protocol: "auto",
    fallback: baseUrl,
}

const authLib = betterAuth({
    baseURL,
    trustedOrigins: envConfig.cors.origins.filter(Boolean),
    database: pool,
    emailAndPassword: {
        enabled: true,
        sendResetPassword: authHook.onSendResetPassword,
    },
    advanced: {
        trustedProxyHeaders: true,
        useSecureCookies: true,
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            partitioned: true,
        },
    },
})

//

export default authLib
