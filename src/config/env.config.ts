
//

const env = {
    port: Number(process.env.PORT),
    host: process.env.HOST || "",
    self: process.env.SELF || "",
    protocol: process.env.PROTOCOL || "",
    esp: { api: { key: process.env.ESP_API_KEY || "" } },
    cors: { origins: (process.env.CORS_ORIGINS || "").split(", ") },
    dev: { email: process.env.DEV_EMAIL || "" },
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
    firebase: {
        sender_id: process.env.FIREBASE_SENDER_ID || "",
        type: process.env.FIREBASE_TYPE || "",
        project_id: process.env.FIREBASE_PROJECT_ID || "",
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
        private_key: process.env.FIREBASE_PRIVATE_KEY || "",
        client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
        client_id: process.env.FIREBASE_CLIENT_ID || "",
        auth_uri: process.env.FIREBASE_AUTH_URI || "",
        token_uri: process.env.FIREBASE_TOKEN_URI || "",
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || "",
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || "",
    },
    database: {
        user: process.env.DATABASE_USER || "",
        pass: process.env.DATABASE_PASS || "",
        host: process.env.DATABASE_HOST || "",
        port: Number(process.env.DATABASE_PORT),
        name: process.env.DATABASE_NAME || "",
        log: process.env.DATABASE_LOG === "true",
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