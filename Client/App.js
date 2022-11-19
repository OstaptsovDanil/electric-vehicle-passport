import {StyleSheet, Text} from 'react-native';
import {useFonts} from 'expo-font';
import CarsScreen from "./screens/CarsScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import AuthScreen from "./screens/AuthScreen";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Header from "./components/Header/Header";
import {stylesVars} from "./constants";
import {Provider} from "react-redux";
import {store} from "./store/store";

export default function App() {

    const [loaded] = useFonts({
        MontserratR: require("./assets/fonts/Montserrat-Regular.ttf"),
        MontserratM: require("./assets/fonts/Montserrat-Medium.ttf"),
        MontserratB: require("./assets/fonts/Montserrat-Bold.ttf"),
    })
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="Cars"
                        component={CarsScreen}
                        options={{headerShown:false}}
                    />
                </Stack.Navigator>
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
