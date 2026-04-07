import env from "@/config/env.config.js"
import authLib from "@/lib/auth.lib.js"

//

const boot = async () => {
    if (!env.boot.admin) return console.info(`Admin boot skipped.`)
    const { name, email, password } = env.admin
    const created = await authLib.api
        .signUpEmail({ body: { name, email, password } })
        .then(() => true)
        .catch(() => false)
    console.info(`Admin ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
