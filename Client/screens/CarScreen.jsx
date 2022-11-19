import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {stylesVars} from "../constants";

const CarScreen = () => {

    const {info} = useSelector(state => state.activeCar);

    useEffect(() => {
    }, [info])

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.window}>
                    <Text style={styles.title}>{info.nameOfVehicle}</Text>
                    <Text style={styles.text}><Text style={styles.label}>VIN: </Text>{info.vin}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Модель: </Text>{info.model}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Тип ТС: </Text>{info.vehicleType}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Категория ТС: </Text>{info.vehicleCategory}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Цвет: </Text>{info.carColor}</Text>
                    {/*<Text>{JSON.stringify(info, null, 2)}</Text>*/}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70
    },
    window: {
        backgroundColor: 'white',
        width: "80%",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",

    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: stylesVars.$blue,
    },
    text: {
        width: "100%",
        fontSize: 17,
        margin: 5
    },
    label: {
        fontSize: 17,
        color : stylesVars.$blue,
    }

});


export default CarScreen;