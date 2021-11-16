import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const InputIcon = (props) => {
    return (
        <Icon color={props.color} style={{ color: props.styleColor, ...styles.inputColors }} active name={props.IconName} />
    )
}

export default InputIcon

const styles = StyleSheet.create({
    inputColors: {
        fontSize: 20,
    },
})
