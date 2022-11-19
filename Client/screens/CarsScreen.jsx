import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {carsCards} from "../mock/carsCards";
import CarCard from "../components/CarCard/CarCard";
import {useSelector} from "react-redux";

const CarsScreen = () => {

    const {cars} = useSelector(state => state.user)

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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default CarsScreen;