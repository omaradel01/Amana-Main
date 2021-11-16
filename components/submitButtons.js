
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';


const SubmitButton = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    });
    return (
        <TouchableOpacity style={{ backgroundColor: '#fff', ...styles.btn }}>
            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>{props.text}</ Text>
        </TouchableOpacity>
    )
}
export default SubmitButton
const styles = StyleSheet.create({

})