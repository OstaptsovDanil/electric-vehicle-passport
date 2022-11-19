import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {stylesVars} from "../constants";
import Select from "../components/Select/Select";
import MyInput from "../components/MyInput/MyInput";
import MyButton from "../components/Button/MyButton";
import MyImagePicker from "../MyImagePicker";

//TODO получать опции с сервера
const categories = [
    'A',
    'B',
    'C',
    'D'
]
const carTypes = [
    'Легковой',
    'Грузовой',
    'Мотоцикл',
]

const engineTypes = [
    "Бензиновый",
    "Дизельный",
    "Электродвигатель"
]

const AddCarScreen = () => {

    const [brand, setBrand] = useState('');
    const [carType, setCarType] = useState(carTypes[0]);
    const [category, setCategory] = useState(categories[0]);
    const [engineType, setEngineType] = useState(engineTypes[0]);
    const [carColor, setCarColor] = useState('');

    return (
        <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.window}>
                    <Text style={styles.title}>Добавление нового ТС</Text>
                    <MyImagePicker text="Добавить фото ПТС" style={{marginBottom: 20,alignItems:'center'}}/>
                    <MyInput
                             placeholder="Марка, модель ТС"
                             value={brand}
                             setValue={setBrand}/>

                    <View style={styles.wrapper}>
                        <Text>Тип ТС</Text>
                        <Select
                            elements={carTypes}
                            onSelect={(value) => setCarType(value)}
                        />
                    </View>

                    <View style={styles.wrapper}>
                        <Text>Категория</Text>
                        <Select
                            elements={categories}
                            onSelect={(value) => setCategory(value)}
                        />
                    </View>

                    <View style={styles.wrapper}>
                        <Text>Двигатель</Text>
                        <Select
                            elements={engineTypes}
                            onSelect={(value) => setEngineType(value)}
                        />
                    </View>
                    <MyInput
                             placeholder="Цвет машины"
                             value={carColor}
                             setValue={setCarColor}/>
                    <MyButton text={'Добавить'}></MyButton>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight:'100%',
        paddingTop : 50,
        backgroundColor: stylesVars.$bg,
        justifyContent: "center",
        alignItems: "center"
    },
    window : {
        backgroundColor : "white",
        width : '87%',
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        padding : 30,
        borderRadius : 10,
    },
    wrapper: {
        width : "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "space-between"
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    }
});

export default AddCarScreen;