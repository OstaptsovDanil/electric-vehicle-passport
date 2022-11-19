import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.wrapper}>
                <Text>1</Text>
                <Text>2</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header:{
      width: "100%",
      height : 50,
      backgroundColor: 'white',
        marginTop: 50,
    },
    wrapper:{
        display: 'flex'
    },
});
