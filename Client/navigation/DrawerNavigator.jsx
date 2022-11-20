import React, {useEffect} from 'react';
import AuthScreen from "../screens/AuthScreen";
import CarsScreen from "../screens/CarsScreen";
import AddCarScreen from "../screens/AddCarScreen";
import CarScreen from "../screens/CarScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useDispatch, useSelector} from "react-redux";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {fetchUserData} from "../store/slices/userSlice";
import {getUserInfo} from "../http/userApi";
import {useNavigation} from "@react-navigation/native";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
    const {userId} = useSelector(state=>state.user);
    const dispatch = useDispatch()
    const navigation = useNavigation();

    async function tryGetUserData(){
        const response = await getUserInfo();
        if(response.hasErrors){
            console.log('HAS ERRORS')
            return;
        }
        console.log('SUCCESSFULLY GET USER DATA')
        dispatch(fetchUserData());
        navigation.navigate('Cars');
    }

    useEffect(()=>{
        tryGetUserData()
    },[])

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
        <Drawer.Navigator initialRouteName={"Cars"} screenOptions={{}}>
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
                options={{drawerLabel: () => null, drawerIcon: ()=>null,title : 'Автомобиль'}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;