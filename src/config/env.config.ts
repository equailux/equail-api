
//

const env = {
    port: Number(process.env.PORT),
    host: process.env.HOST || "",
    protocol: process.env.PROTOCOL || "",
    dev: { email: process.env.DEV_EMAIL || "" },
    jwt: { signInSecret: process.env.JWT_SIGN_IN_SECRET || "" },
    multer: { path: process.env.MULTER_PATH || "" },
    proxy: { url: process.env.PROXY_URL || "" },
    ai: {
        url: process.env.AI_API_URL,
        apikey: process.env.AI_API_KEY,
    },
    admin: {
        name: process.env.ADMIN_NAME || "",
        email: process.env.ADMIN_EMAIL || "",
        password: process.env.ADMIN_PASSWORD || "",
    },
    gmail: {
        address: process.env.GMAIL_ADDRESS || "",
        password: process.env.GMAIL_PASSWORD || "",
    },
    database: {
        user: process.env.DATABASE_USER || "",
        pass: process.env.DATABASE_PASS || "",
        host: process.env.DATABASE_HOST || "",
        port: Number(process.env.DATABASE_PORT),
        name: process.env.DATABASE_NAME || "",
        sync: process.env.DATABASE_SYNC === "true",
        alter: process.env.DATABASE_ALTER === "true",
        force: process.env.DATABASE_FORCE === "true",
        dialect: process.env.DATABASE_DIALECT || "",
    },
}

//

export default env