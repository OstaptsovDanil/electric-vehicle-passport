import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from "react-native";
import {stylesVars} from "../../constants";

const MyButton = ({text,onClick,disabled,textStyle=16,style}) => {

    const [isPressed,setIsPressed] = useState(false);
    const pressableStyles = isPressed ? styles.blueBtnPressed : styles.blueBtn;

    function getStyles(){
        let styles = {...pressableStyles,...style};
        if(disabled) styles = {...styles,backgroundColor:'grey'}
        return styles;
    }

    function pressOut(){
        if(disabled)
            return;
        setIsPressed(false);
        onClick();
    }

    return (
        <Pressable style={getStyles()} onPressIn={()=>{!disabled && setIsPressed(true)}} onPressOut={pressOut}>
            <Text style={{...styles.blueBtnText,...textStyle}}>{text}</Text>
        </Pressable>
    );
};

export default MyButton;

const styles = StyleSheet.create({
    blueBtn:{
        backgroundColor:stylesVars.$blue,
        fontFamily : 'MontserratM',
        color : "white",
        width: "75%",
        height : 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius: 10,
        transition : 1000,
        padding : 5
    },
    blueBtnPressed:{
        color : "white",
        width: "70%",
        height : 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor : "#027ff1",
    },
    blueBtnText:{
        fontSize:16,
        color : "white",
    },

});