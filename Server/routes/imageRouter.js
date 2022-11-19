import { Router } from "express"
import ImageController from "../controllers/imageController.js"

export const imageRouter = new Router()

imageRouter.post('/', ImageController.uploadImage)
