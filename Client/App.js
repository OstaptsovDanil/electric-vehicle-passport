import {StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {stylesVars} from "./constants";
import AuthScreen from "./screens/AuthScreen";
import CarsScreen from "./screens/CarsScreen";
import {Provider, useSelector} from "react-redux";
import {store} from "./store/store";
import CarScreen from "./screens/CarScreen";
import AddCarScreen from "./screens/AddCarScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerNavigator from "./navigation/DrawerNavigator";


export default function App() {

    const [loaded] = useFonts({
        MontserratR: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratM: require("./assets/fonts/Montserrat-Medium.ttf"),
        MontserratB: require("./assets/fonts/Montserrat-Bold.ttf"),
    })

    return (
        <Provider store={store}>
            <NavigationContainer>
                <DrawerNavigator/>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: stylesVars.$bg,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
