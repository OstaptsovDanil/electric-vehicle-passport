import { Router } from 'express'
import { authRouter } from "./authRouter.js"
import { imageRouter } from "./imageRouter.js"
import { carRouter } from "./carRouter.js"

export const router = new Router()

router.use('/auth', authRouter)
router.use('/image', imageRouter)
router.use('/car', carRouter)