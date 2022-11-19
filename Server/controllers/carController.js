import UserModel from "../Models/UserModel.js"
import AutoPasport from "../Models/AutoPasportModel.js"

class CarController {
    async add(req, res) {
        try {
            const {vin, mark, model, nameOfVehicle, vehicleCategory, engineType} = req.body
            const userId = req.userId
            const user = await UserModel.findById(userId)
            if (!user) {
                res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            let autoPasport = await AutoPasport.findOne({vin})
            if (autoPasport) {
                res.status(400).json({
                    message: "Уже зарегестрированна"
                })
            }

            autoPasport = await AutoPasport.create({vin, userId, mark, model, nameOfVehicle, vehicleCategory, engineType})
            
            res.json({
                autoPasport
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте позже...'})
        }
    }
}

export default new CarController()