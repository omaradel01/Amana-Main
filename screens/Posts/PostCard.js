import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import {
    Card, CardItem, Thumbnail,
    Text, Button, Icon, Left, Body, Right
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../../assets/common/baseURL'
// to get calculated width of the screen
var { width } = Dimensions.get('window')
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
export const PostCard = (props) => {
    const [loading, setLoading] = useState(true)
    const { _id, userImage, postImage, userID, rewardValue, postTitle, postDescription, creationDate, Location
        , postType, comments, flags
    } = props;
    useFocusEffect((
        useCallback(
            () => {
                setLoading(false)
                return () => {

                }
            },
            [],
        )
    ))
    // used to import Loaded fonts in each component static
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        return (
            <>
                {
                    loading === false ? (
                        <View>
                            <Card style={{ borderRadius: 10, width: width, alignSelf: 'center', position: 'relative', marginVertical: 40, padding: 10 }}>
                                <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        postType === true ? (
                                            <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'red', color: 'white', padding: 15, borderColor: '#fff', borderWidth: 1, borderRadius: 50 }}>
                                                <Text style={{ fontFamily: 'Poppins-Bold', ...styles.colorText }}>
                                                    Lost
                                                </Text>
                                            </View>
                                        ) :
                                            (
                                                <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'green', color: 'white', padding: 15, borderColor: '#fff', borderWidth: 1, borderRadius: 50 }}>
                                                    <Text style={{ fontFamily: 'Poppins-Bold', ...styles.colorText }}>
                                                        Found
                                                    </Text>
                                                </View>
                                            )
                                    }

                                    <Left>
                                        <Thumbnail
                                            source={{ uri: userID.userImage }}
                                        />
                                        <Body>
                                            <Text style={{ fontFamily: 'Poppins-Med' }}>{userID.firstName} {userID.lastName}</Text>
                                            <Text style={{ fontFamily: 'Poppins-Med' }} note>{userID.userName}</Text>
                                        </Body>
                                    </Left>
                                    <Body style={{ alignSelf: 'center' }}>
                                        {rewardValue > 0 ?
                                            (
                                                <Text style={{ backgroundColor: 'gold', padding: 15, fontSize: 15, marginHorizontal: 20, fontFamily: 'Poppins-Bold' }}>{rewardValue}EGP</Text>
                                            ) :
                                            (
                                                null
                                            )
                                        }
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: postImage ? postImage : 'https://www.turnkeytec.com/wp-content/uploads/2020/07/placeholder-image.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem style={{ marginVertical: 0, textAlign: 'center', alignItems: 'center', justifyContent: "center" }}>
                                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 25 }}>
                                        {postTitle}
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent >
                                            <Icon name="chatbubbles" style={{ color: '#52b788' }} />
                                            <Text style={{ color: '#52b788' }} >{comments.length}</Text>
                                        </Button>
                                        <Button transparent >
                                            <Icon style={{ color: '#52b788' }} name="flag" />
                                            <Text style={{ color: '#52b788' }} >{flags.length}</Text>
                                        </Button>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontFamily: 'Poppins-Bold' }} >{creationDate}</Text>
                                    </Right>
                                </CardItem>
                            </Card >
                        </View>
                    ) : (
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            < ActivityIndicator size='large' color='green' />
                        </View>
                    )
                }

            </>
        )
    }
}

const styles = StyleSheet.create({
    colorText: {
        color: 'white'
    }
})