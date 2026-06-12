import express from "express"
import collectionController from "@/modules/collection/collection.controller.js"

//

const router = express.Router()
router.get("/", collectionController.get)
router.post("/", collectionController.post)
router.patch("/:cid", collectionController.patch)
router.delete("/:cid", collectionController.destroy)

//

export default { router }
