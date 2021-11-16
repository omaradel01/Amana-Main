//import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/core';
import ImageLoader from '../utils/ImageLoader'

const welcome = ({ navigation }) => {
    // each time user return back , the screen loads again
    const isFocused = useIsFocused();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('onBoarding')
        }, 7000);
        // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
    }, [isFocused]);

    return (
        <View style={styles.container} >
            <LinearGradient
                colors={['#40916c', '#52b788', '#74c69d']}
                style={styles.linearGradient}>
                <ImageLoader

                    source={require('../assets/logo.png')}
                    style={{
                        ...styles.mainScreen
                    }}
                    resizeMode="center">
                </ImageLoader>
            </LinearGradient>
        </View >
    );
}



export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    mainScreen: {
        height: 200,
        width: 200
    }
});
