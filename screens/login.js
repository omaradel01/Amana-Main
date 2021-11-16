import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Content, Form, Item, Container, Button } from 'native-base';
import InputForms from '../utils/InputForms'
import InputIcon from '../utils/InputIcon'
import { useFonts } from 'expo-font';
import AuthGlobal from "../Context/Store/AuthGlobal";
import { loginUser } from "../Context/Actions/Auth.actions";
import Toast from "react-native-toast-message"

export const Login = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../assets/fonts/Poppins-Medium.ttf'),
    });
    // show password on press on eye
    const context = useContext(AuthGlobal);
    const [showPass, setPass] = useState(true);
    const passOn = () => setPass(true);
    const passOff = () => setPass(false);
    const [EmailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("The Context ", context.stateUser.isAuthenticated)
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile");
        }
    }, [context.stateUser.isAuthenticated]);

    const LoginSubmit = () => {
        let user = {
            EmailAddress,
            password
        };
        if (EmailAddress == "" || password == "") {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Login Error",
                text2: "Please Fill in Your Forms"
            });
        }
        else {
            loginUser(user, context.dispatch);
        }
    }
    // load fonts 
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {

        return (
            <ScrollView>
                <ImageBackground source={require('../assets/bg-login.png')} style={styles.container} resizeMode="cover">
                    <View style={{ alignItems: 'center' }}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../assets/logo_white.png')} ></Image>
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            ...styles.loginHeader
                        }}>
                            Welcome To Amana
                        </Text>
                    </View>
                    <Container style={styles.formContainer}>
                        <Content>
                            <Form>
                                <Item style={styles.inputContainer}>
                                    <InputIcon styleColor='#fff' color='#fff' active IconName='person-circle-outline' />
                                    <InputForms Placecolor='#fff' color='#fff' style={{ fontFamily: 'Poppins-Med' }} placeholderName='Email Address' name={"EmailAddress"}
                                        id={"EmailAddress"}
                                        value={EmailAddress}
                                        onChangeText={(text) => setEmailAddress(text)} />
                                </Item>
                                <Item last style={styles.inputContainer}>
                                    <InputIcon styleColor='#fff' color='#fff' active IconName='lock-closed-outline' />
                                    <InputForms Placecolor='#fff' color='#fff' style={{ fontFamily: 'Poppins-Med', color: '#fff' }} secure={showPass} placeholderName='Password'
                                        name={"password"}
                                        id={"password"}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)} />

                                    <TouchableOpacity
                                        onPress={showPass == true ? passOff : passOn}
                                    >
                                        <InputIcon styleColor='#fff' active IconName='eye-outline' />
                                    </TouchableOpacity>
                                </Item>
                                <Button transparent light onPress={() => { props.navigation.navigate('Forget Password') }}>
                                    <Text style={{ color: 'white', fontFamily: 'Poppins-Med' }}>Forget Password ?</Text>
                                </Button>
                                <View>
                                    <TouchableOpacity onPress={() => LoginSubmit()} style={{ backgroundColor: '#fff', ...styles.btn }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Login</ Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.endView}>
                                    <Text style={{ fontFamily: 'Poppins-Med', ...styles.endTxt }}>Doesn't Have an account?</Text>
                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate('SignUp')}
                                    >
                                        <Text style={{ fontFamily: 'Poppins-Bold', ...styles.loginTxt }}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </Content>
                    </Container>
                </ImageBackground>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 0
    }
    ,
    loginHeader: {
        fontSize: 30,
        color: "#FFF",
        position: 'relative',
        bottom: 50,
        marginBottom: 0
    },
    formContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 0,
        paddingHorizontal: 25,
        color: '#fff',
        padding: 0,
        bottom: 20
    },
    inputColors: {
        color: '#fff',
        fontSize: 20
    },
    inputContainer: {
        marginVertical: 10
    },
    endView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    endTxt: {
        marginRight: 10,
        fontSize: 17,
        color: '#fff'
    },
    loginTxt: {
        fontSize: 17,
        color: '#fff'
    },
    btn: {
        height: 50,
        width: 200,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#52b788',
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnTxt: {
        color: 'white',
        fontSize: 20,
        color: "#000",
        textAlign: 'center'
    }
});
