import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {carsCards} from "../../mock/carsCards";
import CarCard from "../../components/CarCard/CarCard";

function Vie() {
    return null;
}

const CarsScreen = () => {

    const [cars,setCars] = useState([])

    //TODO загружать с api
    useEffect(()=>{
        setCars(...carsCards);
    },[])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                carsCards.map(car=>(
                    <CarCard name={car.name}></CarCard>
                ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width : '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default CarsScreen;