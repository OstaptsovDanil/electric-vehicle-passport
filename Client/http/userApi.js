import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {AsyncStorage} from "react-native";
import {checkEmail, checkLogin, checkPhone} from "../utils/Validations";
import axios from "axios";

export async function login(login,password){
    try{
        login = '+79785459515';
        password = '123456';
        console.log(!!checkEmail(login))
        let response = {};
        if(!checkLogin(login))
            return null
        if(!!checkEmail(login))
            response = await $host.post('/auth/login',{email:login,password})
        else if(!!checkPhone(login))
            response = await $host.post('/auth/login',{mobilePhone:login,password})
        await AsyncStorage.setItem('token',response.data.token);
        return jwtDecode(response.data.token);
    }catch(e){
        throw new Error(e?.response?.data?.message);
    }
}

export async function registration(inputData){
    try{
        inputData = {
            fullName: "1 1",
            password:'123456',
            mobilePhone:'+79785459451',
            email:"ya@ya.ru"
        }

        const {data} = await $host.post('auth/registration', {...inputData});
        await AsyncStorage.setItem('token',data.token);
        return jwtDecode(data);
    }catch(e){
        console.log('\n\n\nERROR',e);
        const errors = e?.response?.data;
        let errorMessage = '';
        if(Array.isArray(errors)){
            errors.forEach(error => errorMessage += error?.message);
        }
        else errorMessage = errors?.message;
        throw new Error(errorMessage);
    }
}

export async function getUserInfo(){
    try{
        const {data} = await $authHost.get('auth/me');
        return data;
    }catch(e){
        console.log(e);
    }

}