import envConfig from "@/config/env.config.js"
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

const baseUrl = `${envConfig.protocol}://${envConfig.host}:${envConfig.port}`
const baseURL: BaseURLConfig = {
    allowedHosts: [baseUrl, ...envConfig.cors.origins],
    fallback: baseUrl,
}

const authLib = betterAuth({
    baseURL,
    database: pool,
    emailAndPassword: { enabled: true },
})

//

export default authLib
