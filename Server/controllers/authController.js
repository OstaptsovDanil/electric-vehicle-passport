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
            let candidate = await UserModel.findOne({email});
            if (candidate)
                return res.status(400).json({message: "Такой email занят"});
            candidate = await UserModel.findOne({mobilePhone})
            if (candidate)
                return res.status(400).json({message: "Такой телефон занят"});
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
            console.log(req.body)
            //Проверка, если пользователь ничего не ввел
            if ((!email && !mobilePhone) || !password) {
                return res.status(404).json({
                    message: "Введите почту или пароль"
                })
            }
            let user;
            if(email)
                user = await UserModel.findOne({email})
            else if(mobilePhone)
                user = await UserModel.findOne({mobilePhone})
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
            const user = await UserModel.findById(userId).populate('cars');
            console.log(user)
            const {fullName,email,mobilePhone,cars} = user;
            res.json({fullName,email,mobilePhone,cars})
        }catch (e) {

        }
    }
}

export default new AuthController()