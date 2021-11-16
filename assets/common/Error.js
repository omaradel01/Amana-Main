import React from 'react';
import { StyleSheet, View, Text } from 'react-native'


export const Error = (props) => {
    return (
        <View style={styles.errorView}>
            <Text style={styles.errorMessage}>
                {props.message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorView: {
        width: '100%',
        alignItems: 'center',
        margin: 10,
        textAlign: 'center'
    },
    errorMessage: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 15
    }
})