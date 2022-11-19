import UserModel from "../Models/UserModel.js"
import ExpertModel from "../Models/ExpertModel.js"

import bcrypt from "bcrypt"
import createToken from "../utils/createToken.js"
import config from 'config'


class AuthController{
    async register(req, res) {
        try {
            const {fullName, email, password, division} = req.body

            const saltRounds = config.get("saltRounds")
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = await UserModel.create({fullName, email, password: passwordHash, division})
            const token = createToken(user._id)
            res.json({
                userData:{
                    fullName,
                    email,
                    division
                },
                token
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    //Функция временная 
    async registerExpert(req, res) {
        try {
            const {fullName, email, password} = req.body

            const saltRounds = config.get("saltRounds")
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const expert = await ExpertModel.create({fullName, email, password: passwordHash})
            const token = createToken(expert._id)
            res.json({
                expertData:{
                    fullName,
                    email
                },
                token
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const expert = await ExpertModel.findOne({email})
            if (expert) {
                const isPasswordValid = await bcrypt.compare(password, expert.password)
                if (!isPasswordValid) {
                    return res.status(404).json({message: "Неверный  пароль " + password + " " + expert.password})
                }

                const token = createToken(expert._id)
                return res.json({
                    isExpert: true,
                    fullName: expert.fullName,
                    token
                })
            }
            
            const user = await UserModel.findOne({email})
            if (!user) {
                return res.status(404).json({message: "Неверный логин "});
            }
             
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(404).json({message: "Неверный  пароль " + password + " " + user.password})
            }
            
            const token = createToken(user._id)
            
            const {fullName, division} = user

            res.json({
                isExpert: false,
                userData: {
                    fullName,
                    email,
                    division
                },
                token
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }
}

export default new AuthController()