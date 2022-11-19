import {Schema, model} from "mongoose";

const AutoPasportModel = Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
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
        required: true
    },
    engineModel: {
        type: String,
        required: true
    },
    engineNumber: {
        type: String,
        required: true
    },
    chassisNumbers: {
        type: String,
        required: true
    },
    bodyNumbers: {
        type: String,
        required: true
    },
    enginePower: {
        type: String,
        required: true
    },
    engineDisplacement: {
        type: String,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    permittedMaximumMass: {
        type: Number,
        required: true
    },
    weightWithoutLoad: {
        type: Number,
        required: true
    },
    manufacturerInformation: {
        type: String,
        required: true
    },
    countryOfExport: {
        type: String,
        required: true
    },
    customsRestrictions: {
        type: String,
        required: true
    },
})

export default model("AutoPasport", AutoPasportModel)