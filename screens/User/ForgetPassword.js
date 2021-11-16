import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';
import { Content, Form, Item, Container, Root, Icon, Label } from 'native-base';
import InputForms from '../../utils/InputForms';
import baseURL from '../../assets/common/baseURL'
import axios from 'axios';
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ForgetPassword = ({ navigation }) => {
    const [EmailAddress, setEmailAddress] = useState('')
    const [securityQuestion, setSecurityQuestion] = useState('')
    const [user_id, getUserID] = useState('')
    const [token, setToken] = useState('')
    const [initialState, setInitialState] = useState('Check Account')
    const [count, setCount] = useState(0)
    let user = {
        EmailAddress: EmailAddress,
        securityQuestion: securityQuestion
    }
    console.log("User enter", user)
    const checkEmail = () => {
        if (EmailAddress == '' || securityQuestion == '') {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "This Account is not Found",
            });
            return;
        }
        axios.post(`${baseURL}users/checkemail`, user)
            .then((res) => {
                if (res.status == 200 || res.status === 201) {
                    setInitialState('Proceed')
                    setToken(res.data.token);
                    getUserID(res.data.user)
                    AsyncStorage.setItem("jwt", token)
                    console.log("user", user_id)
                    console.log("token", token)
                    const userPass = {
                        user: user_id,
                        token: token
                    }
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Verification Successful",
                    });

                    navigation.navigate('Change Password', { userData: userPass })
                }

            })
            .catch((error) => {
                console.log(error.message)
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "This Account is not Found",
                });
            })
    }
    return (
        <Root>
            <KeyboardAwareScrollView viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true} >
                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}
                    contentContainerStyle={styles.container}
                >
                    <Image source={require('../../assets/forget.png')} resizeMode='center' style={styles.main} />
                    <Text style={{ fontFamily: 'Poppins-Bold', ...styles.mainTitle }}>
                        Reset Your Password
                    </Text>
                    <Container style={styles.formContainer}>
                        <Content>
                            <Form>
                                <Item style={styles.inputContainer} fixedLabel>
                                    <Label style={{ fontSize: 15, fontFamily: 'Poppins-Med' }}>Email Address</Label>
                                    <InputForms
                                        selection='#52b788' Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        name={"EmailAddress"}
                                        id={"EmailAddress"}
                                        value={EmailAddress}
                                        onChangeText={(text) => setEmailAddress(text)}
                                    />
                                </Item>
                                <Item style={styles.inputContainer} fixedLabel>
                                    <Label style={{ fontSize: 15, fontFamily: 'Poppins-Med' }}>Security Question</Label>
                                    <InputForms
                                        selection='#52b788' Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        name={"SecurityQuestion"}
                                        id={"SecurityQuestion"}
                                        value={securityQuestion}
                                        secure={true}
                                        onChangeText={(text) => setSecurityQuestion(text)}
                                    />
                                </Item>
                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            setCount(count + 1)
                                            setInitialState('Process')
                                            if (count > 1) {
                                                checkEmail()
                                            }
                                        }
                                        } style={{ backgroundColor: '#fff', ...styles.btn }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </Content>
                    </Container>
                </ScrollView >
            </KeyboardAwareScrollView >
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    main: {
        marginVertical: 10,
        height: 250,
        width: 400
    },
    mainTitle: {
        fontSize: 20,
        padding: 30
    },
    inputContainer: {
        marginVertical: 10,
        width: '100%'
    },
    formContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 0,
        paddingHorizontal: 25,
        color: '#fff',
        paddingVertical: 10,
        height: 250
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
})