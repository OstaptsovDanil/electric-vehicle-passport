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
    checkLength,
    checkLogin,
    checkName,
    checkPhone,
    useFormValidator,
    useValidator,
    Validation
} from "../utils/Validations";
import {useDispatch} from "react-redux";
import {fetchUserData} from "../store/slices/userSlice";

function Input() {
    return null;
}

const AuthScreen = () => {

    const navigation = useNavigation();

    const [isRegistration, setIsRegistration] = useState(false);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [errors,setErrors] = useState('')

    const dispatch = useDispatch();

    const nameValidator = useValidator([
        new Validation(checkLength(3, 20), "Имя должна быть длиной от 3 до 20 символов"),
        new Validation(checkName, "В имени не может быть лишних символов"),
    ]);
    const surnameValidator = useValidator([
        new Validation(checkLength(5, 25), "Фамилия должна быть длиной от 5 до 25 символов"),
        new Validation(checkName, "В фамилии не может быть лишних символов"),
    ]);
    const phoneValidator = useValidator([
        new Validation(checkPhone, "Неправильный формат номера!"),
    ]);
    const emailValidator = useValidator([
        new Validation(checkEmail, "Неправильный формат почты!"),
    ]);
    const loginValidator = useValidator([
        new Validation(checkLogin, 'Неправильный формат логина (Введите почту или телефон)')
    ])
    const passwordValidator = useValidator([
        new Validation(checkLength(6, 25), "Пароль должен быть длиной от 6 до 25 символов"),
    ]);
    const confirmPasswordValidator = useValidator([
        new Validation(checkEqual(password), "Пароли не совпадают"),
    ]);

    const registerFormValidator = useFormValidator(nameValidator, surnameValidator, passwordValidator, confirmPasswordValidator, phoneValidator);
    const loginFormValidator = useFormValidator(loginValidator, passwordValidator);

    async function fetchRegistration() {
        const response = await userApi.registration({
            fullName: (name + ' ' + surname),
            email,
            mobilePhone: phone,
            password
        })
        console.log('RESPONSE :',response)
        if(response.hasErrors){
            setErrors(response.data)
            console.log(response.data);
            return;
        }
        dispatch(fetchUserData())
        navigation.navigate('Cars');
    }

    async function fetchLogin() {
        try {
            const response = await userApi.login({login, password})
            dispatch(fetchUserData())
            navigation.navigate('Cars');
        } catch (e) {
            console.log(e);
        }
    }

    function cleanFields() {
        setSurname('')
        setName('')
        setLogin('')
        setPassword('')
        setConfirmPasswordText('')
    }

    useEffect(() => {
        cleanFields()
    }, [isRegistration])

    if (isRegistration)
        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.window}>
                        <Text style={styles.title}>Регистрация</Text>
                        <MyInput validator={surnameValidator} placeholder="Фамилия"
                                 value={surname} setValue={setSurname}/>
                        <MyInput validator={nameValidator} placeholder="Имя" value={name}
                                 setValue={setName}/>
                        <MyInput validator={phoneValidator} placeholder="Номер телефона"
                                 value={phone} setValue={setPhone}/>
                        <MyInput validator={emailValidator} placeholder="Почта"
                                 value={email} setValue={setEmail}/>
                        <MyInput validator={passwordValidator} placeholder="Пароль"
                                 value={password} setValue={setPassword} isPassword/>
                        <MyInput validator={confirmPasswordValidator}
                                 placeholder="Повторите пароль" value={confirmPasswordText}
                                 setValue={setConfirmPasswordText} isPassword/>
                        <Text>
                            {errors}
                        </Text>
                        <MyButton disabled={false/*registerFormValidator?.hasErrors()*/} onClick={fetchRegistration}
                                  text={'Зарегистрироваться'}></MyButton>
                        <TouchableHighlight onPressOut={() => setIsRegistration(!isRegistration)}
                                            underlayColor={stylesVars.$lightBlue}>
                            <Text style={styles.offerText}>Есть аккаунт ? Войдите!</Text>
                        </TouchableHighlight>
                    </View>

                </ScrollView>
            </View>
        )

    return (
        <View style={styles.container}>
            <View style={styles.window}>
                <Text style={styles.title}>Авторизация</Text>
                <MyInput validator={loginValidator} placeholder="Номер телефона или почта"
                         value={login} setValue={setLogin}/>
                <MyInput validator={passwordValidator} placeholder="Пароль" value={password}
                         setValue={setPassword} isPassword/>
                <MyButton disabled={false/*loginFormValidator?.hasErrors()*/} onClick={fetchLogin}
                          text={'Войти'}></MyButton>
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
        width: "100%",
        minHeight: '100%',
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
        marginTop: 70,
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
