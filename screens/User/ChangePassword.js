import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';
import { Content, Form, Item, Container, Root, Icon, Label } from 'native-base';
import InputForms from '../../utils/InputForms';
import InputIcon from '../../utils/InputIcon';
import baseURL from '../../assets/common/baseURL'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ChangePassword = ({ navigation, route }) => {
    const [userID, getUserID] = useState(route.params.userData)
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [token, setToken] = useState('')
    useFocusEffect((
        useCallback(
            () => {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))
                console.log("token", token)
            })
    ))
    let user = {
        password: newPassword
    }
    console.log("User Object", userID)

    const config = {
        headers: {
            'Authorization': `Bearer ${userID.token}`
        }
    }
    const addNewPassword = () => {
        console.log(userID)
        if (newPassword !== confPassword) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Passwords did not Match",
            });
            return
        }
        console.log(`${baseURL}users/newpass/${userID.user}`)
        axios
            .put(`${baseURL}users/newpass/${userID.user}`, user, config)
            .then((res) => {
                if (res.status == 200 || res.status === 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Password Successfully Updated",
                    });
                    setTimeout(() => {
                        navigation.navigate("Login");
                    }, 500);
                }
            })
            .catch((error) => {
                console.log(error.message)
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Error while Updating Password , Please Try Again !",
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
                    <Image source={require('../../assets/newpass.png')} resizeMode='center' style={styles.main} />
                    <Text style={{ fontFamily: 'Poppins-Bold', ...styles.mainTitle }}>
                        Now Add Your New Password
                    </Text>
                    <Container style={styles.formContainer}>
                        <Content>
                            <Form>
                                <Item style={styles.inputContainer}>
                                    <InputIcon color='#52b788' styleColor='#000' active IconName='lock-closed-outline' />
                                    <InputForms
                                        selection='#52b788'
                                        Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        secure={true}
                                        placeholderName='New Password'
                                        name={"npassword"}
                                        id={"npassword"}
                                        value={newPassword}
                                        onChangeText={(text) => setNewPassword(text)}
                                    />
                                </Item>
                                <Item>
                                    <InputIcon color='#52b788' styleColor='#000' active IconName='lock-closed-outline' />
                                    <InputForms
                                        selection='#52b788'
                                        Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        secure={true}
                                        placeholderName='Confirm Password'
                                        name={"confpassword"}
                                        id={"confpassword"}
                                        value={confPassword}
                                        onChangeText={(text) => setConfPassword(text)}
                                    />
                                </Item>

                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity onPress={() => addNewPassword()} style={{ backgroundColor: '#fff', ...styles.btn }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Submit</Text>
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
        height: 400,
        width: 400
    },
    mainTitle: {
        fontSize: 20,
        padding: 30
    },
    inputContainer: {
        marginVertical: 10,
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
        marginVertical: 30,
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