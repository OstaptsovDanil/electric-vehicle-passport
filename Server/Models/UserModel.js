import {Schema, model} from "mongoose";

const UserModel = new Schema({
    email: {
        type: String, 
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cars:[ {
        type:Schema.Types.ObjectId,
        ref:'AutoPasport', 
        default:[]
    } ],
})

export default model('User', UserModel)