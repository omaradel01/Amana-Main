import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';
import { Content, Form, Item, Container, Root, Icon, Label } from 'native-base';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InputForms from '../../utils/InputForms';
import InputIcon from '../../utils/InputIcon';
import baseURL from '../../assets/common/baseURL'
import axios from 'axios';
import Toast from 'react-native-toast-message'
import * as ImagePicker from "expo-image-picker"
import mime from "mime";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export const EditAccount = ({ navigation, route }) => {
    const context = useContext(AuthGlobal)
    const [item, setItem] = useState(route.params.userProfile);
    const [EmailAddress, setEmailAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [userImage, setUserImage] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confPassword, setConfPassword] = useState();
    const [token, setToken] = useState('')
    useEffect(() => {
        setEmailAddress(item.EmailAddress);
        setPhoneNumber(item.phoneNumber);
        setUserImage(item.userImage);

        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work done !")
                }
            }
        })();
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
        return () => {
        }
    }, [])

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setUserImage(result.uri);
        }
    };

    // Image Picker
    // Image Picker
    (async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
    })();



    const ApplyUpdate = () => {
        console.log("The Token ", token)
        if (newPassword !== confPassword) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Passwords didn't match !"
            });
        }
        else {
            let formData = new FormData();
            if (userImage === null || userImage === "" || userImage == item.userImage) {
                formData.append("userImage", item.userImage)
            }
            else {
                const newImageUri = "file:///" + userImage.split("file:/").join("");
                formData.append("userImage", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop()
                });
            }
            formData.append("EmailAddress", EmailAddress);
            formData.append("phoneNumber", phoneNumber);
            if (newPassword === '' || newPassword == null) {
                formData.append("password", item.password);
            }
            else {
                formData.append("password", newPassword);
            }
            console.log(formData._parts[0][1])
            console.log('actual user image', item.userImage)
            console.log(context.stateUser.user.userID)
            axios.put(`${baseURL}users/${context.stateUser.user.userID}`, formData, config)
                .then(response => {
                    if (response.status == 200 || response.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Edit Account successfully",
                        });
                        setTimeout(() => {
                            navigation.navigate("User Profile");
                        }, 500);
                    }
                }).catch((error) => {
                    // console.log(error.message)
                    if (error.message === 'Request failed with status code 400') {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Updating Error",
                            text2: error.response.data.Errors[0].msg
                        });
                        return
                    }
                    else {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Updating Error",
                            text2: error.response.data.Errors[0].msg
                        });
                    }
                });
        }
    }
    return (
        <Root>
            <KeyboardAwareScrollView viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true} >
                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}
                    contentContainerStyle={styles.container}
                >
                    {/* <Image source={require('../assets/Login.png')} resizeMode='center' style={styles.main} /> */}
                    <Text style={{ fontFamily: 'Poppins-Bold', ...styles.mainTitle }}>
                        Welcome {item.firstName}
                    </Text>
                    <Container style={styles.formContainer}>
                        <Content>
                            <Form>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: userImage }} />
                                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                                        <Icon style={{ color: "white" }} name="camera" />
                                    </TouchableOpacity>
                                </View>
                                <Item style={styles.inputContainer} inlineLabel>
                                    <Label>Email</Label>
                                    <InputIcon color='#52b788' styleColor='#000' active IconName='mail-outline' />
                                    <InputForms
                                        selection='#52b788' Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        name={"EmailAddress"}
                                        id={"EmailAddress"}
                                        value={EmailAddress}
                                        onChangeText={(text) => setEmailAddress(text)}
                                    />
                                </Item>
                                <Item style={styles.inputContainer} inlineLabel>
                                    <Label>Phone Number</Label>
                                    <InputIcon color='#52b788' styleColor='#000' active IconName='call-outline' />
                                    <InputForms
                                        selection='#52b788' Placecolor='#52b788'
                                        style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                        name={"phoneNumber"}
                                        id={"phoneNumber"}
                                        value={phoneNumber}
                                        onChangeText={(text) => setPhoneNumber(text)}

                                    />
                                </Item>
                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity onPress={() => ApplyUpdate()} style={{ backgroundColor: '#fff', ...styles.btn }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Submit Updates</Text>
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
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#52b788",
        elevation: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'

    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
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
        fontSize: 30,
        marginVertical: 15
    },
    inputContainer: {
        marginVertical: 10
    },
    formContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 0,
        paddingHorizontal: 25,
        color: '#fff',
        paddingVertical: 10,
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