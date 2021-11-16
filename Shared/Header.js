import React from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native'

export const Header = () => {
    return (
        <SafeAreaView style={styles.mainHeader}>
            <Image
                source={require('../assets/logo_green.png')}
                style={{ height: 100, width: 100, alignSelf: 'center', justifyContent: 'center' }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingTop: 20,
        elevation: 10,
        height: 50
    }
})