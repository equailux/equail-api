
//

const env = {
    port: Number(process.env.PORT),
    host: process.env.HOST || "",
    protocol: process.env.PROTOCOL || "",
    dev: { email: process.env.DEV_EMAIL || "" },
    jwt: { signInSecret: process.env.JWT_SIGN_IN_SECRET || "" },
    multer: { path: process.env.MULTER_PATH || "" },
    proxy: { url: process.env.PROXY_URL || "" },
    boot: {
        admin: process.env.BOOT_ADMIN === "true",
        app: process.env.BOOT_APP === "true",
        cloudflared: process.env.BOOT_CLOUDFLARED === "true",
        cloudinary: process.env.BOOT_CLOUDINARY === "true",
        database: process.env.BOOT_DATABASE === "true",
        esp: process.env.BOOT_ESP === "true",
        mail: process.env.BOOT_MAIL === "true",
        settings: process.env.BOOT_SETTINGS === "true",
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
        certificate: process.env.DATABASE_CERTIFICATE,
    },
    cloudinary: {
        cloudname: process.env.CLOUDINARY_CLOUDNAME || "",
        api: {
            key: process.env.CLOUDINARY_API_KEY || "",
            secret: process.env.CLOUDINARY_API_SECRET || "",
        },
    },
}

//

export default env