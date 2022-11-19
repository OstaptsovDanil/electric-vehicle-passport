import UserModel from "../Models/UserModel.js"
import AutoPasport from "../Models/AutoPasportModel.js"

class CarController {
    async add(req, res) {
        try {
            //console.log(req.body);
            const {vin, model,carColor,nameOfVehicle,vehicleType, vehicleCategory, engineType} = req.body
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

            autoPasport = await AutoPasport.create({vin, userId, model, carColor, nameOfVehicle,vehicleType, vehicleCategory, engineType})
            await user.updateOne({$push: {cars: autoPasport._id}});

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