import express from "express"
import remarkController from "@/modules/remarks/remark.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", remarkController.get)
router.patch("/:rid", remarkController.patch)
router.delete("/:rid", remarkController.destroy)

//

export default { router }
