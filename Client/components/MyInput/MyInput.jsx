import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {stylesVars} from "../../constants";

// placeholder="Номер телефона" style={styles.input} value={login} onTextInput={value=>setLogin(value)

const MyInput = ({validator,errorsHidden, placeholder,value ,setValue, isPassword = false}) => {

    function input(e){
        validator?.validate(e.nativeEvent.text)
        setValue(e.nativeEvent.text)
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.error}>{!errorsHidden ? validator?.errors : ''}</Text>
            <TextInput secureTextEntry={isPassword} style={styles.input} placeholder = {placeholder} value = {value} onChange={input}></TextInput>
        </View>
    );
};

export default MyInput;

const styles = StyleSheet.create({
    wrapper: {
        width : '90%',
        display : 'flex',
        flexDirection : 'column'
    },
    input: {
        borderRadius : 3,
        height : 40,
        backgroundColor : stylesVars.$lightBlue,
        fontSize : 16,
        marginBottom : 20,
        padding : 10,
    },
    error: {
        color : 'red',
        fontSize : 12,
        textAlign : "center"
    }
,})