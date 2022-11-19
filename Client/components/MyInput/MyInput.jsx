import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {stylesVars} from "../../constants";

// placeholder="Номер телефона" style={styles.input} value={login} onTextInput={value=>setLogin(value)

const MyInput = ({validator,placeholder,value ,setValue, isPassword = false}) => {

    const [showErrors, setShowErrors] = useState(false);

    function blur(){
        setShowErrors(true);
    }
    function input(e){
        validator?.validate(e.nativeEvent.text)
        setValue(e.nativeEvent.text)
    }

    useEffect(()=>{
       validator?.validate('');
    },[])

    return (
        <View style={styles.wrapper}>
            <Text style={styles.error}>{showErrors ? validator?.errors : ''}</Text>
            <TextInput onBlur={blur} secureTextEntry={isPassword} style={styles.input} placeholder = {placeholder} value = {value} onChange={input}></TextInput>
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