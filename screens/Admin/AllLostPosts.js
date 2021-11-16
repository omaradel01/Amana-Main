import React, { useContext, useState, useCallback } from 'react';
import { TouchableOpacity, ScrollView, View, Dimensions, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Icon } from 'native-base';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import baseURL from '../../assets/common/baseURL'
import { useFocusEffect } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
var { width, height } = Dimensions.get('window')
export const AllLostPosts = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    const context = useContext(AuthGlobal)
    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }
            else {
                fetch(`${baseURL}posts/admin/lost`, { method: 'GET' })
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
        if (postData.length == 0) {
            return (
                <View style={styles.searchWrap}>
                    <View >
                        <Image source={require('../../assets/noposts.png')}
                            style={{ width: width / 2 + 90, height: height / 2 }}
                            resizeMode='cover'
                        />
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20 }}>No Posts Found ..</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <>
                    {
                        loading === false ?
                            (
                                <ScrollView>
                                    {
                                        postData.map((item) => {
                                            return (
                                                <Content key={Math.random()} >
                                                    <List >
                                                        <ListItem thumbnail  >
                                                            <Left style={{ backgroundColor: '#52b788', padding: 5 }}>
                                                                <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>
                                                                    {item.userID.userName}
                                                                </Text>
                                                            </Left>
                                                            <Body>
                                                                <Text style={{ fontFamily: 'Poppins-Med' }}>{item.postTitle}</Text>
                                                                <Badge danger >
                                                                    <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>
                                                                        Lost
                                                                    </Text>
                                                                </Badge>
                                                            </Body>
                                                            <Right>
                                                                <Button onPress={() =>
                                                                    props.navigation.navigate("Post Details", { item: item }
                                                                    )
                                                                } style={{ backgroundColor: "#007AFF" }}>
                                                                    <Icon active name="eye" />
                                                                </Button>
                                                            </Right>
                                                        </ListItem>
                                                    </List>
                                                </Content>
                                            )
                                        })
                                    }
                                </ScrollView>
                            ) :
                            (
                                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                    < ActivityIndicator size='large' color='green' />
                                </View>
                            )
                    }
                </>
            )

        }
    }
}

const styles = StyleSheet.create({
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})