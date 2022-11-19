import UserModel from "../Models/UserModel.js"

import bcrypt from "bcrypt"
import createToken from "../utils/createToken.js"
import config from 'config'


class AuthController{
    async register(req, res) {
        try {
            const {fullName, email, password} = req.body

            const saltRounds = config.get("saltRounds")
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = await UserModel.create({fullName, email, password: passwordHash})
            const token = createToken(user._id)
            res.json({
                message: "Good",
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
            
            const user = await UserModel.findOne({email})
            if (!user) {
                return res.status(404).json({message: "Неверный логин "});
            }
             
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(404).json({message: "Неверный  пароль " + password + " " + user.password})
            }
            
            const token = createToken(user._id)
            
            const {fullName} = user

            res.json({
                userData: {
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
}

export default new AuthController()