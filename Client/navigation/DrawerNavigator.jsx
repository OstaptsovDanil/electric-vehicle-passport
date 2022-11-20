import React from 'react';
import AuthScreen from "../screens/AuthScreen";
import CarsScreen from "../screens/CarsScreen";
import AddCarScreen from "../screens/AddCarScreen";
import CarScreen from "../screens/CarScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useSelector} from "react-redux";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
    const {userId} = useSelector(state=>state.user);

    console.log('USERID : ',userId);

    if(!userId)
        return (
            <Stack.Navigator  screenOptions={{headerShown: false,}}>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={
                        {
                            drawerLabel: () => null, drawerIcon: ()=>null,
                            drawerActiveBackgroundColor:'transparent',
                            drawerStyle : ()=>null
                        }
                    }
                />
                <Stack.Screen
                    name="Cars"
                    component={CarsScreen}
                />
                <Stack.Screen
                    name="AddCar"
                    component={AddCarScreen}
                />
                <Stack.Screen
                    name="Car"
                    component={CarScreen}
                    options={{drawerLabel: () => null, drawerIcon: ()=>null}}
                />
            </Stack.Navigator>
        )

    return (
        <Drawer.Navigator initialRouteName={"Cars"} screenOptions={{headerShown: false,}}>
            <Drawer.Screen
                name="Auth"
                component={AuthScreen}
                options={{title:'Авторизация'}}
            />
            <Drawer.Screen
                name="Cars"
                component={CarsScreen}
                options={{title:'Автомобили'}}
            />
            <Drawer.Screen
                name="AddCar"
                component={AddCarScreen}
                options={{title:'Добавление автомобиля'}}
            />
            <Drawer.Screen
                name="Car"
                component={CarScreen}
                options={{drawerLabel: () => null, drawerIcon: ()=>null}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;