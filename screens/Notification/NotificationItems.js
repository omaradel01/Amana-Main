import React, { useContext, useState, useCallback } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width, height } = Dimensions.get('window')
export const NotificationItems = ({ navigation }) => {
    const context = useContext(AuthGlobal)
    const [loading, setLoading] = useState(true)
    const [Notifications, getNotifications] = useState([])
    const [token, setToken] = useState('')
    const [itemPost, setItem] = useState([])
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    useFocusEffect((
        useCallback(
            () => {
                fetch(`${baseURL}notifications/user/${context.stateUser.user.userID}`, { method: 'GET' })
                    .then(response => response.json())
                    .then(json => {
                        setLoading(false)
                        getNotifications(json)
                    }).catch((error) => {
                        console.log('API ERROR', error)
                    })
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error));

            },
            [Notifications]

        )
    ))
    const redirectPost = (postItem) => {
        // console.log("The Notification Item ", postItem)
        if (postItem.postID === null || postItem.postID === undefined) {
            Alert.alert(
                "Post Is Not Available",
                "The Requested Post is not available !",
                [
                    {
                        text: "OK", onPress: () => {
                            console.log('ok')
                        }
                    }
                ],
                { cancelable: false }
            );
            DeleteNotification(postItem.id)
        }
        else {
            navigation.navigate('Post Details', { item: postItem.postID })
        }
    }

    const DeleteNotification = (id) => {
        let deleteRequest = {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`${baseURL}notifications/${id}`, deleteRequest)
            .then(response => {
                console.log('truee')
                if (response.status == 200 || response.status === 201) {
                    setTimeout(() => {
                        navigation.navigate("Notification");
                    }, 500);
                }
            }).catch((error) => {
                console.log(error)
                return
            })
    }


    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            return (
                <View style={{ margin: 'auto', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/rejected.png')}
                        style={{ width: width / 2, height: height / 2 }}
                        resizeMode='contain'
                    />
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Med', fontSize: 20 }}>You don't have an access to view this page</Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Go To Registeration</ Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        }
        else {
            return (
                <ScrollView>
                    <Header style={{ backgroundColor: '#52b788' }} />
                    <Content>
                        <>
                            {
                                loading === true ?
                                    (
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                flex: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <ActivityIndicator size="large" color="green" />
                                        </View>
                                    ) :
                                    (
                                        Notifications.length > 0 ?
                                            (

                                                Notifications.map((items) => {
                                                    // console.log(items)
                                                    return (
                                                        <List key={items.id}>
                                                            <ListItem avatar onPress={() => { redirectPost(items) }}>
                                                                <Left>
                                                                    {items.notificationHeader === 'Post is Rejected !'
                                                                        ?
                                                                        <Thumbnail source={require('../../assets/rejected_post.png')} />
                                                                        :
                                                                        items.notificationHeader === 'Post is Published !'
                                                                            ?
                                                                            <Thumbnail source={require('../../assets/check.png')} />
                                                                            :
                                                                            items.notificationHeader === 'New comment on your post !'
                                                                                ?
                                                                                <Thumbnail source={require('../../assets/speech-bubble.png')} />
                                                                                :
                                                                                items.notificationHeader === 'New Post Added !'
                                                                                    ?
                                                                                    <Thumbnail source={require('../../assets/plus.png')} />
                                                                                    :
                                                                                    items.notificationHeader === 'Post is Updated !'
                                                                                        ?
                                                                                        <Thumbnail source={require('../../assets/editnotify.png')} />
                                                                                        :
                                                                                        items.notificationHeader === 'There Is a Matching Post !'
                                                                                            ?
                                                                                            <Thumbnail source={require('../../assets/match.png')} />
                                                                                            :
                                                                                            items.notificationHeader === 'Warning!'
                                                                                                ?
                                                                                                <Thumbnail source={require('../../assets/warning.png')} />
                                                                                                :
                                                                                                items.notificationHeader === 'Post deleted!'
                                                                                                    ?
                                                                                                    <Thumbnail source={require('../../assets/bin.png')} />
                                                                                                    :
                                                                                                    null
                                                                    }
                                                                </Left>
                                                                <Body >
                                                                    <Text style={{ fontFamily: 'Poppins-Bold' }}>{items.notificationHeader}</Text>
                                                                    <Text style={{ fontFamily: 'Poppins-Med', fontSize: 12 }} note>{items.notificationText}</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text style={{ fontFamily: 'Poppins-Med' }} note >{items.notificationDate}</Text>

                                                                    <Button iconRight transparent onPress={() => {
                                                                        console.log("The Notification PostID", items.id)
                                                                        DeleteNotification(items.id)
                                                                    }} >
                                                                        <Icon name='trash' style={{ color: "#52b788" }} />
                                                                    </Button>
                                                                </Right>
                                                            </ListItem>
                                                        </List>
                                                    )
                                                })
                                            ) :
                                            (
                                                <View style={styles.searchWrap}>
                                                    <View>
                                                        <Image source={require('../../assets/noposts.png')}
                                                            style={{ width: width / 2 + 90, height: height / 2 }}
                                                            resizeMode='cover'
                                                        />
                                                        <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>No Notifications Found</Text>
                                                    </View>
                                                </View>
                                            )

                                    )
                            }
                        </>
                    </Content>
                </ScrollView>

            )


        }


    }

}




const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: 280,
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
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})
