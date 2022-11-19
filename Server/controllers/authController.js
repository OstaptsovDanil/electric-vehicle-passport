import UserModel from "../Models/UserModel.js"

import bcrypt from "bcrypt"
import createToken from "../utils/createToken.js"
import config from 'config'


class AuthController{
    async register(req, res) {
        try {
            const {fullName, email, mobilePhone, password} = req.body
            console.log('REGISTER',req.body);
            const saltRounds = config.get("saltRounds")
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = await UserModel.create({fullName, email, mobilePhone, password: passwordHash})
            const token = createToken(user._id)
            res.json({
                message: "Register ok",
                token
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }

    async login(req, res) {
        try {
            const {
                email = undefined,
                mobilePhone = undefined,
                password = undefined
            } = req.body
            //Проверка, если пользователь ничего не ввел
            if ((!email && !mobilePhone) || !password) {
                return res.status(404).json({
                    message: "Введите почту или пароль"
                })
            }
        
            const user = await UserModel.findOne(email ? {email} : {mobilePhone})
            if (!user) {
                return res.status(404).json({
                    message: "Неверный логин "
                })
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(404).json({
                    message: "Неверный  пароль "
                })
            }
        
            const token = createToken(user._id)
            
            const {fullName} = user
            res.json({
                userData: {
                    fullName,
                },
                token
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }
    async getUser(req,res){
        try{
            console.log('Getting user');
            const userId = req.userId;
            const user = await UserModel.findById(userId);
            const {fullName,email,mobilePhone,cars} = user;
            res.json({fullName,email,mobilePhone,cars})
        }catch (e) {

        }
    }
}

export default new AuthController()