import React, { useContext, useState, useCallback } from 'react';
import { TouchableOpacity, ScrollView, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Icon } from 'native-base';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { useFocusEffect } from '@react-navigation/native'
import { isLoading, useFonts } from 'expo-font';
import Toast from 'react-native-toast-message'
import baseURL from '../../assets/common/baseURL'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AppLoading from 'expo-app-loading';
var { width } = Dimensions.get("window");
export const DeletePosts = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    useFocusEffect((
        useCallback(
            () => {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error));

            },
            []
        )
    ))
    const context = useContext(AuthGlobal)
    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState("");
    const ApplyDelete = (post_id) => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        Alert.alert(
            "Delete Post",
            "Are You Sure You want to delete that post ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        console.log('ok')
                        axios.delete(`${baseURL}posts/${post_id}`, config)
                            // fetch(`${baseURL}posts/${post_id}`, { method: 'DELETE' })
                            //     .then(response => response.json())
                            .then(response => {
                                console.log("Post Deleted Successfully")
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: "Deleted Succeeded",
                                });
                                setTimeout(() => {
                                    props.navigation.navigate("View");
                                }, 500);
                            }).catch(err => console.log(err))
                    }
                }
            ],
            { cancelable: false }
        );
    }
    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }
            else {
                fetch(`${baseURL}posts/dashboard/${context.stateUser.user.userID}`, { method: 'GET' })
                    .then(response => response.json())
                    .then(response => {
                        setPostData(response)
                        setLoading(false)
                    }).catch(err => console.log(err))
            }
            return () => {
                setPostData([])
            }

        }, []))
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        return (
            <>
                <ScrollView>
                    {
                        loading === false ?
                            (
                                postData.map((item) => {
                                    return (
                                        <List key={Math.random()}>
                                            <ListItem thumbnail >
                                                <Left>
                                                    <Thumbnail square source={{ uri: item.postImage == " " ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' : item.postImage }} />
                                                </Left>
                                                <Body>
                                                    <Text>{item.postTitle}</Text>
                                                    {item.postType === true ?
                                                        <Badge danger >
                                                            <Text style={{ padding: 5, fontSize: 12, color: '#fff' }}>
                                                                Lost
                                                            </Text>
                                                        </Badge>
                                                        :
                                                        <Badge success >
                                                            <Text style={{ padding: 5, fontSize: 12, color: '#fff' }}>Found</Text>
                                                        </Badge>
                                                    }
                                                </Body>
                                                <Right>
                                                    {item.postStatus === true ?
                                                        <Text style={{ padding: 5, fontSize: 12 }}>
                                                            Published
                                                        </Text>
                                                        :
                                                        <Text style={{ padding: 5, fontSize: 12 }}>Pending</Text>
                                                    }
                                                    <Button danger onPress={() => ApplyDelete(item._id)}

                                                    >
                                                        <Icon active name="trash" />
                                                    </Button>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    )
                                })
                            ) :
                            (
                                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                    < ActivityIndicator size='large' color='green' />
                                </View>
                            )
                    }
                </ScrollView>

            </>
        )

    }
}
