import { Router } from 'express'
import { authRouter } from "./authRouter.js"
import { imageRouter } from "./postImageRouter.js"

export const router = new Router()

router.use('/auth', authRouter)
router.use('/image', imageRouter)