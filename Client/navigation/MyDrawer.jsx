import React from 'react';
import {Text, View} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const avaliableRoutes = [
    "Cars",
    "AddCar"
]

const MyDrawer = (props) => {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    );
};

export default MyDrawer;