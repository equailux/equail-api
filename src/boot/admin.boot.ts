import env from "../config/env.config.js"
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"

//

const boot = async () => {
    const { name, email } = env.admin
    const password = await bcrypt.hash(env.admin.password, 10)
    const [_, created] = await User.findOrCreate({ where: { email }, defaults: { name, email, password } })
    console.info(`Admin ${created ? "created" : "found"} successfully.`)
}

//

export default { boot }
