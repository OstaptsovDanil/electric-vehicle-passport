import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import MyButton from "../components/Button/MyButton";
import {useNavigation} from "@react-navigation/native";
import {stylesVars} from "../constants";
import MyInput from "../components/MyInput/MyInput";
import * as userApi from '../http/userApi'

import {
    checkEmail,
    checkEqual,
    checkLength, checkLogin,
    checkName,
    checkPhone,
    useFormValidator,
    useValidator,
    Validation
} from "../utils/Validations";
import {registration} from "../http/userApi";
import {useDispatch} from "react-redux";
import {fetchUserData} from "../store/slices/userSlice";

function Input() {
    return null;
}

const AuthScreen = () => {

    const navigation = useNavigation();

    const [isRegistration, setIsRegistration] = useState(true);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [errorsHidden,setErrorsHidden] = useState(false);

    const dispatch = useDispatch();

    const nameValidator = useValidator([
        new Validation(checkLength(3,20), "Имя должна быть длиной от 3 до 20 символов"),
        new Validation(checkName, "В имени не может быть лишних символов"),
    ]);
    const surnameValidator = useValidator([
        new Validation(checkLength(5,25), "Фамилия должна быть длиной от 5 до 25 символов"),
        new Validation(checkName, "В фамилии не может быть лишних символов"),
    ]);
    const phoneValidator = useValidator([
        new Validation(checkPhone, "Неправильный формат номера!"),
    ]);
    const emailValidator = useValidator([
        new Validation(checkEmail, "Неправильный формат почты!"),
    ]);
    const loginValidator = useValidator([
        new Validation(checkLogin,'Неправильный формат логина (Введите почту или телефон)')
    ])
    const passwordValidator = useValidator([
        new Validation(checkLength(6, 25), "Пароль должен быть длиной от 6 до 25 символов"),
    ]);
    const confirmPasswordValidator = useValidator([
        new Validation(checkEqual(password), "Пароли не совпадают"),
    ]);

    const registerFormValidator = useFormValidator(nameValidator, surnameValidator, passwordValidator,confirmPasswordValidator);

    async function fetchRegistration() {
        const response = await userApi.registration({
            fullName: (name + ' ' + surname),email,mobilePhone:phone,password
        })
        console.log('RESPONSE : ',response)
    }

    async function fetchLogin(){
        try{
            const response = await userApi.login({login,password})
            await dispatch(fetchUserData())
            navigation.navigate('Cars');
        }
        catch(e){
            console.log(e);
        }
    }

    function cleanFields(){
        setSurname('')
        setName('')
        setLogin('')
        setPassword('')
        setConfirmPasswordText('')
    }

    useEffect(()=>{
        cleanFields()
    },[isRegistration])

    if (isRegistration)
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.window}>
                    <Text style={styles.title}>Регистрация</Text>
                    <MyInput errorsHidden={errorsHidden} validator={surnameValidator} placeholder="Фамилия" value={surname} setValue={setSurname}/>
                    <MyInput errorsHidden={errorsHidden} validator={nameValidator} placeholder="Имя" value={name} setValue={setName}/>
                    <MyInput errorsHidden={errorsHidden} validator={phoneValidator} placeholder="Номер телефона" value={phone} setValue={setPhone}/>
                    <MyInput errorsHidden={errorsHidden} validator={emailValidator} placeholder="Почта" value={email} setValue={setEmail}/>
                    <MyInput errorsHidden={errorsHidden} validator={passwordValidator} placeholder="Пароль" value={password} setValue={setPassword} isPassword/>
                    <MyInput errorsHidden={errorsHidden} validator={confirmPasswordValidator} placeholder="Повторите пароль" value={confirmPasswordText} setValue={setConfirmPasswordText} isPassword/>
                    <MyButton onClick={fetchRegistration} text={'Зарегистрироваться'}></MyButton>
                    <TouchableHighlight onPressOut={() => setIsRegistration(!isRegistration)}
                                        underlayColor={stylesVars.$lightBlue}>
                        <Text style={styles.offerText}>Есть аккаунт ? Войдите!</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        )

    return (
        <View style={styles.container}>
            <View style={styles.window}>
                <Text style={styles.title}>Авторизация</Text>
                <MyInput errorsHidden={errorsHidden} validator={loginValidator} placeholder="Номер телефона или почта" value={login} setValue={setLogin}/>
                <MyInput errorsHidden={errorsHidden} validator={passwordValidator} placeholder="Пароль" value={password} setValue={setPassword} isPassword/>
                <MyButton onClick={fetchLogin} text={'Войти'}></MyButton>
                <TouchableHighlight onPressOut={() => setIsRegistration(!isRegistration)}
                                    underlayColor={stylesVars.$lightBlue}>
                    <Text style={styles.offerText}>Нет аккаунта? Зарегистрируйтесь!</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        width: "100%",
        backgroundColor: '#F4FCFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    window: {
        width: "85%",
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,

    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },

    offerText: {
        color: stylesVars.$blue,
        textAlign: "center",
        fontSize: 15,
        marginTop: 10,
    }
});
