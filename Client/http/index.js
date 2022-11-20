import axios from "axios";
import {AsyncStorage} from 'react-native';

export const API_URL = "http://10.0.2.2:8080";

export const $host = axios.create({
    baseURL:API_URL
});

export const $authHost = axios.create({
    baseURL:API_URL
})

const authInterceptor = async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers.authorization = `Bearer ${token || ''}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);
