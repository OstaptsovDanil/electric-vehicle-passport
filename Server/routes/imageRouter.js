import { Router } from "express"
import ImageGetter from "../controllers/imageController.js"

export const imageRouter = new Router()

imageRouter.post('/', ImageGetter.uploadImage)