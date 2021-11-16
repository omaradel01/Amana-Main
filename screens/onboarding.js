import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
const onBoarding = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        return (
            <Onboarding
                onSkip={() => navigation.navigate('Login')}
                onDone={() => navigation.navigate('Login')}
                pages={
                    [
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.imageTutorial} source={require('../assets/tutorial1.jpg')} />,
                            title:
                                <Text style={{ fontFamily: 'Poppins-Bold', ...styles.titles }}>Create an account</Text>,
                            subtitle: <Text style={{ fontFamily: 'Poppins-Med' }}>Register with your personal information</Text>
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.imageTutorial} source={require('../assets/tutorial2.jpg')} />,
                            title: <Text style={{ fontFamily: 'Poppins-Bold', ...styles.titles }}>Add Posts , Share it</Text>,
                            subtitle: <Text style={{ fontFamily: 'Poppins-Med' }}>Describe your item help you to find it faster</Text>
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.imageTutorial} source={require('../assets/tutorial3.jpg')} />,
                            title: <Text style={{ fontFamily: 'Poppins-Bold', ...styles.titles }}>Communicate with people</Text>,
                            subtitle: <Text style={{ fontFamily: 'Poppins-Med' }}>connect with people that interact with your post</Text>
                        }
                    ]}
            />

        );
    }
}
export default onBoarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titles: {
        fontSize: 25,
        textAlign: 'center',
        color: '#52b788',
        textTransform: "capitalize",
        marginBottom: 20,
    },

    imageTutorial: {
        width: 350,
        height: 300
    }
});
