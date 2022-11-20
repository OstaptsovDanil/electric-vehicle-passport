import {StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {stylesVars} from "./constants";
import {Provider} from "react-redux";
import {store} from "./store/store";
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
