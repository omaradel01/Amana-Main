import React, { useContext, useState } from 'react'
import AuthGlobal from '../../Context/Store/AuthGlobal'
import AsyncStorage from "@react-native-async-storage/async-storage"
var { width, height } = Dimensions.get('window')
import { Content, Form, Item, Container, Root, Textarea, Label } from 'native-base';
import baseURL from '../../assets/common/baseURL'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { TouchableOpacity, View, Dimensions, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
export const AddComment = ({ route, navigation }) => {
    const context = useContext(AuthGlobal)
    const [postID, getPostID] = useState(route.params.postID);
    const [commentBody, setCommentBody] = useState("")
    const [token, setToken] = useState();
    AsyncStorage.getItem("jwt")
        .then((res) => {
            setToken(res)
        })
        .catch((error) => console.log(error))

    const AddPostComment = () => {
        if (commentBody == '') {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "You Must Fill Your Comment",
            });
            return
        }
        console.log(commentBody)
        let textcom = {
            text: commentBody
        }
        const request = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        console.log(request.body)
        axios.post(`${baseURL}posts/comments/${postID}`, textcom, request)
            .then(response => {
                if (response.status == 200 || response.status === 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Comment Posted successfully",
                    });
                    setTimeout(() => {
                        navigation.navigate("Home");
                    }, 500);
                }
                else if (response.status == 400) {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Error While Posting",
                    });
                }
            }).catch((error) => {
                console.log(error.message)
            })
    }

    if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
        return (
            <ScrollView>
                <View style={{ marginVertical: 60, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/rejected.png')}
                        style={{ width: width / 2, height: height / 2 }}
                        resizeMode='contain'
                    />
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Med', fontSize: 20 }}>You don't have an access to view this page</Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Go To Login</ Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <Root>
                <KeyboardAwareScrollView viewIsInsideTabBar={true}
                    enableOnAndroid={true} >
                    <ScrollView showsVerticalScrollIndicator={false} persistentScrollbar={false}
                        contentContainerStyle={styles.container}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/Posts-pana.png')} resizeMode='center' style={styles.main} />
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.mainTitle }}>
                                Add a New Comment
                            </Text>
                        </View>
                        <Container style={styles.formContainer}>
                            <Content>
                                <Form>
                                    <Item style={styles.inputContainer} stackedLabel>
                                        <Textarea rowSpan={10}
                                            style={{ ...styles.textArea, fontFamily: 'Poppins-Med' }}
                                            color='#000'
                                            bordered
                                            placeholder="Place Your Comment Here"
                                            name={"text"}
                                            id={"text"}
                                            value={commentBody}
                                            onChangeText={(text) => setCommentBody(text)}
                                        />
                                    </Item>
                                    <View style={{ marginVertical: 10 }}>
                                        <TouchableOpacity onPress={() => AddPostComment()} style={{ backgroundColor: '#fff', ...styles.btnSub }}>
                                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnSubTxt }}>Post</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Form>
                            </Content>
                        </Container>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </Root>
        )
    }
}
const styles = StyleSheet.create({
    textArea: {
        width: '100%',
        marginVertical: 10,
        padding: 5,
        fontSize: 20
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
    postControllerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    PostButtons: {
        backgroundColor: '#52b788',
        padding: 20,
        margin: 12,
        height: 100
    },
    PostButtonsIcons: {
        marginRight: 20,
        fontSize: 30,
        fontWeight: 'bold'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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
        marginVertical: 10
    },
    formContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 0,
        paddingHorizontal: 25,
        color: '#fff',
        paddingVertical: 10,
        height: 450
    },
    btnSub: {
        height: 50,
        width: 200,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#52b788',
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnSubTxt: {
        color: 'white',
        fontSize: 20,
        color: "#000",
        textAlign: 'center'
    }

})