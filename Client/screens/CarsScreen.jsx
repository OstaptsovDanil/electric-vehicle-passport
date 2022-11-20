import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import CarCard from "../components/CarCard/CarCard";
import {useSelector} from "react-redux";
import MyButton from "../components/Button/MyButton";
import {useNavigation} from "@react-navigation/native";

const CarsScreen = () => {

    const {cars} = useSelector(state => state.user)
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                cars?.map(car => (
                    <CarCard key={car?.vin} carData={car}></CarCard>
                ))
            }
            <MyButton onClick={() => navigation.navigate("AddCar")} style={styles.add} text={"+"}/>
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
    add: {
        width: 60,
        height: 60,
        borderRadius: 30,
        fontSize: 5,
        marginBottom: 20
    }
});


export default CarsScreen;