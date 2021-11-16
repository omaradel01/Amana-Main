import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import { useFonts } from 'expo-font';
const InputForms = (props) => {
    useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../assets/fonts/Poppins-Medium.ttf'),
    });
    return (
        <Input
            keyboardType={props.keyboard}
            color={props.color}
            selectionColor={props.selection}
            style={{ ...styles.inputColors, fontFamily: 'Poppins-Med' }}
            secureTextEntry={props.secure}
            placeholderTextColor={props.Placecolor}
            placeholder={props.placeholderName}
            name={props.name}
            id={props.id}
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
        />

    );
}

export default InputForms

const styles = StyleSheet.create({
    inputColors: {
        fontSize: 20,
    },
    inputContainer: {
        marginVertical: 10
    }
})
