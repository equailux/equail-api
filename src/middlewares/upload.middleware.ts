import env from "@/config/env.config.js";
import multer from "multer";

//

const storage = multer.diskStorage({
    destination: `${process.cwd()}/${env.multer.path}`,
    filename: (_, file, cb) => cb(null, `${10000000000000 - Date.now()}-${Math.random().toFixed(4)}-${file.filename}`),
})

const filter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true)
    else cb(new Error("Only images are allowed."))
}

const upload = multer({
    storage,
    limits: { fieldSize: 5 * 1024 * 1024 },
    fileFilter: filter,
})

//

export default { upload }
