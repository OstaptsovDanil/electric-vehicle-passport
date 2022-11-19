import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {stylesVars} from "../../constants";

const Select = ({elements, onSelect}) => {

    const [selected, setSelected] = useState(elements[0]);
    const [isOpen, setIsOpen] = useState(false);

    function select(value) {
        onSelect(value);
        setSelected(value)
        toggle();
    }

    function toggle() {
        setIsOpen(!isOpen)
    }

    const getStyleForVariant = index => index % 2 === 0 ? {backgroundColor: stylesVars.$lightBlue2} : {}

    return (
        <Pressable onPressOut={toggle}>
            <View style={styles.wrapper}>
                <Text style={styles.active}>{selected}</Text>
                {isOpen &&
                    <View style={styles.variants}>
                        {
                            elements?.filter(el => el !== selected)?.map((el, index) => (
                                <TouchableHighlight onPressOut={() => select(el)}>
                                    <View style={{...styles.variant, ...getStyleForVariant(index)}}>
                                        <Text>{el}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>}
            </View>
        </Pressable>
    );
};

export default Select;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        marginBottom: 20,

    },
    active: {
        backgroundColor: '#E8F0FE',
        width: 200,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 50,
        alignItems: 'center',
        position: 'relative'
    },
    variants: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
    },
    variant: {
        alignItems: "center",
        height: 40,
        fontSize: 20,
        backgroundColor: stylesVars.$lightBlue,
        display: "flex",
        justifyContent: "center",
    }
});
