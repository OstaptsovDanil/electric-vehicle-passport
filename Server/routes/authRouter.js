import { Router } from "express"
import authController from "../controllers/authController.js"
import { registrationValidations, checkValidation} from "../utils/validations.js"
import {getUserId} from "../utils/authChecker.js";

export const authRouter = new Router()

authRouter.post('/registration', registrationValidations, checkValidation, authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/me',getUserId, authController.getUser)