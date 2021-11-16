import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native';
import { Content, Form, Item, Container, Root, Picker, Icon, Label } from 'native-base';
import { useFonts } from 'expo-font';
import InputForms from '../utils/InputForms';
import InputIcon from '../utils/InputIcon';
import { Error } from '../assets/common/Error'
import baseURL from '../assets/common/baseURL'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
export const SignUp = (props) => {
    useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../assets/fonts/Poppins-Medium.ttf'),
    });
    // show password on press on eye
    const [showPass, setPass] = useState(true);
    const passOn = () => setPass(true);
    const passOff = () => setPass(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [EmailAddress, setEmailAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userImage, setUserImage] = useState("");
    const [allAreas, getAllAreas] = useState([])
    const [userArea, setUserArea] = useState("60f621917eab5c551c722f06");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work done !"
                    );
                }
            }
        })();
        fetch(`${baseURL}locations`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                getAllAreas(response);
                console.log(response)
                setLoading(false);
            })
            .catch((err) => console.log(err));
        return () => {
            getAllAreas([]);
        };
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setUserImage(result.uri);
        }
    };
    const onUserLocationSelection = (value) => {
        setUserArea(value)
    }
    const register = () => {
        if (firstName == "" || lastName == "" || EmailAddress == "" || userName == "" ||
            phoneNumber == "" || userArea == "" || password == "" || securityQuestion == "") {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Submission Error",
                text2: "Please Fill In the form correctly !",
            });
            return
        }
        else if (phoneNumber.startsWith('01') === false) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Submission Error",
                text2: "Phone Number Must Start With 01 !",
            });
            return
        }
        else {
            let formData = new FormData();
            if (userImage === null || userImage === "") {
                formData.append("userImage", "")
            }
            else {
                const newImageUri = "file:///" + userImage.split("file:/").join("");
                formData.append("userImage", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop()
                });
            }
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("EmailAddress", EmailAddress);
            formData.append("userName", userName);
            formData.append("phoneNumber", phoneNumber);
            formData.append("password", password);
            formData.append("userArea", userArea)
            formData.append("securityQuestion", securityQuestion)
            console.log(formData)
            axios
                .post(`${baseURL}users/register`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                .then((res) => {
                    if (res.status == 200) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registration Succeeded",
                            text2: "Please Login into your account",
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Login");
                        }, 500);
                    }
                })
                .catch((error) => {
                    // console.log(error.message)
                    if (error.message === 'Request failed with status code 400') {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Registeration Error",
                            text2: error.response.data.Errors[0].msg
                        });
                        return
                    }
                    else {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Registeration Error",
                            text2: error.response.data.Errors[0].msg
                        });
                    }
                });
        };
    }
    return (
        <>
            {
                loading == false
                    ?
                    (
                        <KeyboardAwareScrollView
                            viewIsInsideTabBar={true}
                            extraHeight={200}
                            enableOnAndroid={true}>
                            <ScrollView showsVerticalScrollIndicator={true}
                                persistentScrollbar={true}
                                contentContainerStyle={styles.container} >
                                <Image source={require('../assets/Login.png')} resizeMode='center' style={styles.main} />
                                <Text style={{ fontFamily: 'Poppins-Bold', ...styles.mainTitle }}>
                                    Create Your Account
                                </Text>
                                <Content>
                                    <Form>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                marginTop: 30,
                                                paddingLeft: 10
                                            }}
                                        >
                                            <InputIcon
                                                styleColor="#000"
                                                active
                                                IconName="camera-outline"
                                            />
                                            <Label style={{ color: '#52b788', fontFamily: 'Poppins-Med', paddingLeft: 10 }} color='#52b788'>Your Personal Image (Optional)</Label>
                                        </View>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.image} resizeMode="contain" source={{
                                                uri: userImage == '' ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : userImage
                                            }}
                                            />
                                            <TouchableOpacity
                                                onPress={pickImage}
                                                style={styles.imagePicker}>
                                                <Icon style={{ color: "white", marginRight: 2 }} name="camera" />
                                                <Text style={{ color: '#fff', fontFamily: 'Poppins-Med' }}>Upload an Image</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='person-outline' />
                                                <InputForms
                                                    selection='#52b788' Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    placeholderName='First Name'
                                                    name={"firstName"}
                                                    id={"firstName"}
                                                    value={firstName}
                                                    onChangeText={(text) => setFirstName(text)}
                                                />
                                            </View>

                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='person-outline' />
                                                <InputForms
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    placeholderName='Last Name'
                                                    name={"lastName"}
                                                    id={"lastName"}
                                                    value={lastName}
                                                    onChangeText={(text) => setLastName(text)}
                                                />
                                            </View>
                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='mail-outline' />
                                                <InputForms
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    placeholderName='Email Address'
                                                    name={"EmailAddress"}
                                                    id={"EmailAddress"}
                                                    value={EmailAddress}
                                                    onChangeText={(text) => setEmailAddress(text)}
                                                />
                                            </View>
                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='person-circle-outline' />
                                                <InputForms
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    placeholderName='Username'
                                                    name={"userName"}
                                                    id={"userName"}
                                                    value={userName}
                                                    onChangeText={(text) => setUserName(text)} />
                                            </View>
                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='call-outline' />
                                                <InputForms
                                                    keyboard='numeric'
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    placeholderName='Phone Number'
                                                    name={"phoneNumber"}
                                                    id={"phoneNumber"}
                                                    value={phoneNumber}
                                                    onChangeText={(text) => setPhoneNumber(text)} />
                                            </View>
                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon
                                                    color="#52b788"
                                                    styleColor="#000"
                                                    active
                                                    IconName="checkmark-circle-outline"
                                                />
                                                <Label style={{ fontFamily: 'Poppins-Med' }}>Your Area</Label>
                                            </View>
                                            <View style={styles.pickercontainer}>
                                                <Picker
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    mode={"dropdown"}
                                                    selectedValue={userArea}
                                                    style={{ height: 50, width: '100%', fontSize: 30, fontFamily: 'Poppins-Med' }}
                                                    onValueChange={(value) =>
                                                        onUserLocationSelection(value)
                                                    }
                                                >
                                                    {
                                                        allAreas.map(item =>

                                                            <Picker.Item style={{ fontFamily: 'Poppins-Med' }} label={item.area.toString()} value={item.id.toString()} key={Math.random()} />

                                                        )
                                                    }
                                                </Picker>
                                            </View>
                                        </Item>

                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='lock-closed-outline' />
                                                <InputForms
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    secure={showPass}
                                                    placeholderName='Password'
                                                    name={"password"}
                                                    id={"password"}
                                                    value={password}
                                                    onChangeText={(text) => setPassword(text)}
                                                />
                                                <TouchableOpacity
                                                    onPress={showPass == true ? passOff : passOn}>
                                                    <InputIcon styleColor='#000' active IconName='eye-outline' />
                                                </TouchableOpacity>
                                            </View>
                                        </Item>
                                        <Item style={styles.inputContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <InputIcon color='#52b788' styleColor='#000' active IconName='lock-closed-outline' />
                                                <InputForms
                                                    selection='#52b788'
                                                    Placecolor='#52b788'
                                                    style={{ fontFamily: 'Poppins-Med', color: '#52b788' }}
                                                    secure={showPass}
                                                    placeholderName='What is Your Best Friend Name ?'
                                                    name={"securityQuestion"}
                                                    id={"securityQuestion"}
                                                    value={securityQuestion}
                                                    onChangeText={(text) => setSecurityQuestion(text)}
                                                />
                                            </View>
                                        </Item>
                                        {error ? (<Error message={error} />) : (null)}
                                        <View style={{ marginVertical: 10 }}>
                                            <TouchableOpacity onPress={() => register()} style={{ backgroundColor: '#fff', ...styles.btn }}>
                                                <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Register</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Form>
                                </Content>
                            </ScrollView >
                        </KeyboardAwareScrollView >
                    )
                    :
                    (
                        <View
                            style={{
                                justifyContent: "center",
                                flex: 1,
                                alignItems: "center",
                                alignSelf: 'center',
                            }}
                        >
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    )

            }
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    main: {
        marginVertical: 10,
        height: 250,
        width: 400
    },
    mainTitle: {
        fontSize: 30,
    },
    inputContainer: {
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    formContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 0,
        paddingHorizontal: 25,
        color: "#fff",
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
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderStyle: "solid",
        borderWidth: 5,
        padding: 0,
        justifyContent: "center",
        borderColor: "#52b788",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#52b788",
        padding: 8,
        borderRadius: 100,
        elevation: 20,
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickercontainer: {
        paddingTop: 0,
        alignItems: "flex-start",
        width: '100%'
    },
})


