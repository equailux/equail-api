import env from "@/config/env.config.js"
import cloudinaryService from "@/shared/services/cloudinary.service.js"

//

const boot = async () => {
    if (!env.boot.cloudinary) return console.info(`Cloudinary boot skipped.`)
    const { cloudname, api } = env.cloudinary
    await cloudinaryService.connect(cloudname, api.key, api.secret)
    console.info(`Cloudinary cloud configured.`)
}

//

export default { boot }
