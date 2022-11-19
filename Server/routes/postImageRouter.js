import { Router } from "express"
import ImageGetter from "../controllers/image.js"

export const imageRouter = new Router()

imageRouter.post('/', ImageGetter.getImage)