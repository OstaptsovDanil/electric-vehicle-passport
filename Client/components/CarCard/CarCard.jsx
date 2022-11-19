import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {stylesVars} from "../../constants";

const CarCard = ({name,...props}) => {
    return (
        <Pressable  style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </Pressable>
    );
};

export default CarCard;

const styles = StyleSheet.create({
    container: {
        padding : 10,
        backgroundColor:'white',
        width : '70%',
        borderRadius: 10,
        height : 120,
        marginBottom: 20,
    },
    text : {
      color : stylesVars.$blue,
        fontFamily: 'MontserratB',
    },
});
