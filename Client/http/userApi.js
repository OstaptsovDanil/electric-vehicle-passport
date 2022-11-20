import {$authHost, $host, API_URL} from "./index";
import jwtDecode from "jwt-decode";
import {AsyncStorage} from "react-native";
import {checkEmail, checkLogin, checkPhone} from "../utils/Validations";
import axios from "axios";

export async function login(login,password){
    try{
        // login = '+79785459421';
        // password = '123456';
        let response = {};
        if(!checkLogin(login))
            return null
        if(!!checkEmail(login))
            response = await $host.post('/auth/login',{email:login,password})
        else if(!!checkPhone(login))
            response = await $host.post('/auth/login',{mobilePhone:login,password})
        await AsyncStorage.setItem('token',response.data.token);
        return {
            hasErrors:false,
            data: jwtDecode(response.data.token)
        }
    }
    catch(e){
        console.log(e)
        return {
            hasErrors: true,
            data: e?.response.data.message
        };
    }
}

export async function registration(inputData){
    try{
        // inputData = {
        //     fullName: "1 1",
        //     password:'123456',
        //     mobilePhone:'+79785459421',
        //     email:"yaa@ya.ru"
        // }
        const {data} = await $host.post('auth/registration', {...inputData});
        await AsyncStorage.setItem('token',data.token);
        return {
            hasErrors: false,
            data: await jwtDecode(data.token)
        };
    }catch(e){
        console.log('\n\n\nERROR',e);
        const errors = e?.response?.data;
        let errorMessage = '';
        if(Array.isArray(errors)){
            errors.forEach(error => errorMessage += error?.message + '\n');
        }
        else errorMessage = errors?.message;
        return {
            hasErrors: true,
            data: errorMessage
        };
    }
}

export async function getUserInfo(){
    try{
        const {data} = await $authHost.get('auth/me');
        return {
            hasErrors:false,
            data,
        };
    }catch(e){
        console.log(e);
        return {
            hasErrors : true,
            data : e
        }
    }
}

export async function getPts(formData){
    try{
        console.log(formData)
        const res = await fetch(
            API_URL + '/image/',
            {
                method: 'post',
                body: formData,
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
        )
        return await res.json();
    }
    catch(e){
        return e;
    }
}

export async function addCar(carData){
    try{
        console.log('\n\n\nADD',carData)

        const {data} = await $authHost.post('car/',{
            model : carData.model,
            carColor : carData.carColor,
            vehicleType : carData.carType,
            vehicleCategory : carData.category,
            engineType : carData.engineType,
            nameOfVehicle : carData.carName,
            vin : carData.vin,
        });
        return {
            hasErrors : false,
            data :data.autoPasport
        };
    }catch(e){
        console.log(e);
        return {
            hasErrors:true,
            data:e
        }
    }
}

