import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from "react-native";
import {stylesVars} from "../../constants";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setActiveCarData} from "../../store/slices/activeCarSlice";

const CarCard = ({carData}) => {

    const {
        model,
        vin,
        carType,
        vehicleCategory,
        nameOfVehicle,
        engineType,
        carColor
    } = carData

    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function handleClick() {
        await dispatch(setActiveCarData(carData));
        navigation.navigate('Car')
    }

    return (
        <Pressable onPressOut={handleClick} style={styles.container}>
            <Text style={styles.name}>{nameOfVehicle}</Text>
            <Text style={styles.text}>Модель : {model}</Text>
            <Text style={styles.text}>Цвет : {carColor}</Text>
            <Text style={styles.text}>Категория : {vehicleCategory}</Text>
            <Text style={styles.text}>Двигатель : {engineType}</Text>
        </Pressable>
    );
};

export default CarCard;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        height: 120,
        marginBottom: 20,
    },
    name: {
        color: stylesVars.$blue,
        fontFamily: 'MontserratB',
    },
    text: {
        color: stylesVars.$blue,
        fontFamily: 'MontserratM'
    }
});
