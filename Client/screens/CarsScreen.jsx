import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {carsCards} from "../mock/carsCards";
import CarCard from "../components/CarCard/CarCard";
import {useSelector} from "react-redux";
import MyButton from "../components/Button/MyButton";
import {useNavigation} from "@react-navigation/native";

const CarsScreen = () => {

    const {cars} = useSelector(state => state.user)
    const navigation = useNavigation();

    //TODO загружать с api
    useEffect(() => {

    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                carsCards.map(car => (
                    <CarCard name={car.name}></CarCard>
                ))
            }
            <MyButton onClick={()=>navigation.navigate("AddCar")} style={styles.add} text={"+"} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    add:{
        width:60,
        height:60,
        borderRadius:30,
        fontSize:5,
        marginBottom:20
    }
});


export default CarsScreen;