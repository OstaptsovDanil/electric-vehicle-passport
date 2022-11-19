import { Router } from 'express'
import { authRouter } from "./authRouter.js"

export const router = new Router()

router.use('/auth', authRouter)