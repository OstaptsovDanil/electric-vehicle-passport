import { Router } from "express"
import CarController from "../controllers/carController.js"
import {getUserId} from "../utils/authChecker.js";


export const carRouter = new Router()

carRouter.post('/', getUserId, CarController.add)