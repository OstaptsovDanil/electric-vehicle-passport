import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {stylesVars} from "../constants";
import Select from "../components/Select/Select";
import MyInput from "../components/MyInput/MyInput";
import MyButton from "../components/Button/MyButton";
import MyImagePicker from "../MyImagePicker";
import {checkLength, checkName, useFormValidator, useValidator, Validation} from "../utils/Validations";
import {fetchAddNewCar} from "../store/slices/userSlice";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";

//TODO получать опции с сервера
const categories = [
    'B',
    'A',
    'C',
    'D'
]
const carTypes = [
    'Легковой',
    'Грузовой',
    'Мотоцикл',
]

const engineTypes = [
    "Электродвигатель",
    "Бензиновый",
    "Дизельный",
]

const AddCarScreen = () => {

    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');
    const [carName, setCarName] = useState('');
    const [carType, setCarType] = useState(carTypes[0]);
    const [category, setCategory] = useState(categories[0]);
    const [engineType, setEngineType] = useState(engineTypes[0]);
    const [carColor, setCarColor] = useState('');

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const colorValidator = useValidator([
        new Validation(checkName, "В названии цвета могут быть лишь буквы"),
    ]);

    const vinValidator = useValidator([
        new Validation(checkLength(17,17), "VIN должен быть длиной в 17 символов"),
    ]);

    const formValidator = useFormValidator(colorValidator);

    async function handleAddCar(){
        await dispatch(fetchAddNewCar({
            model,
            vin,
            carType,
            category,
            carName,
            engineType,
            carColor
        }));
        navigation.navigate('Cars');
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.window}>
                    <Text style={styles.title}>Добавление нового ТС</Text>
                    <MyImagePicker text="Добавить фото ПТС" style={{marginBottom: 20, alignItems: 'center'}}/>
                    <MyInput
                        placeholder="Как хотите назвать автомобиль?"
                        value={carName}
                        setValue={setCarName}/>
                    <MyInput
                        validator={vinValidator}
                        placeholder="VIN"
                        value={vin}
                        setValue={setVin}/>
                    <MyInput
                        placeholder="Марка, модель ТС"
                        value={model}
                        setValue={setModel}/>

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

                    {/*<View style={styles.wrapper}>
                        <Text>Двигатель</Text>
                        <Select
                            elements={engineTypes}
                            onSelect={(value) => setEngineType(value)}
                        />
                    </View>*/}
                    <MyInput
                        validator={colorValidator}
                        placeholder="Цвет машины"
                        value={carColor}
                        setValue={setCarColor}/>
                    <MyButton style = {styles.btn} onClick={handleAddCar} disabled={formValidator?.hasErrors()} text={'Добавить'}></MyButton>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        paddingTop: 50,
        backgroundColor: stylesVars.$bg,
        justifyContent: "center",
        alignItems: "center"
    },
    window: {
        backgroundColor: "white",
        width: '87%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        borderRadius: 10,
    },
    wrapper: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },


});

export default AddCarScreen;