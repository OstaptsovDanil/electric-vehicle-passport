import {Schema, model} from "mongoose";

const AutoPasportModel = Schema({
    vin: {
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    nameOfVehicle: {
        type: String,
        required: true
    },
    vehicleCategory: {
        type: String,
        required: true
    },
    yearOfManufacture: {
        type: Number,
        required: false
    },
    engineModel: {
        type: String,
        required: false
    },
    engineNumber: {
        type: String,
        required: false
    },
    chassisNumbers: {
        type: String,
        required: false
    },
    bodyNumbers: {
        type: String,
        required: false
    },
    enginePower: {
        type: String,
        required: false
    },
    engineDisplacement: {
        type: String,
        required: false
    },

    engineType: {
        type: String,
        required: true
    },
    
    permittedMaximumMass: {
        type: Number,
        required: false
    },
    weightWithoutLoad: {
        type: Number,
        required: false
    },
    manufacturerInformation: {
        type: String,
        required: false
    },
    countryOfExport: {
        type: String,
        required: false
    },
    customsRestrictions: {
        type: String,
        required: false
    },
})

export default model("AutoPasport", AutoPasportModel)