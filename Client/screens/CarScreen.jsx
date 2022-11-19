import React, {useState} from 'react';
import {ScrollView, Text, View} from "react-native";

const CarScreen = () => {

    const [brand, setBrand] = useState('');
    const [carType, setCarType] = useState('');
    const [category, setCategory] = useState('');
    const [engineType, setEngineType] = useState('');
    const [carColor, setCarColor] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.window}>
                <Text style={styles.title}>Регистрация</Text>
            </View>
        </ScrollView>
    );
};

export default CarScreen;