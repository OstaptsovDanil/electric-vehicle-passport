import {Schema, model} from "mongoose";

const UserModel = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    mobilePhone: {
        type: String, 
        unique: true,
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