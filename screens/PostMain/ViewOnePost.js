import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Image, View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Badge, H3, Icon, Body, Button, Thumbnail } from 'native-base';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
var { width, height } = Dimensions.get('window')

export const ViewOnePost = ({ navigation, route }) => {
    const [item, setItem] = useState(route.params.item);
    const [loading, setLoading] = useState(true)

    const handleFlag = () => {
        Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Flag Success",
            text2: "The Post is Reported Successfully"
        });
    }


    useFocusEffect((
        useCallback(
            () => {
                console.log("-----------------------------------------")
                console.log("The Item Coming Here is ", item)
                console.log("------------------------------------------")
                setLoading(false)
                return () => {
                }
            },
            [item])
    ))
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
                {loading === false ? (
                    <ScrollView style={{ backgroundColor: '#fff', width: width }}>
                        <Image style={{ height: height / 3, width: width, alignSelf: 'center' }} resizeMode="contain" source={{ uri: item.postImage }}>
                        </Image>
                        <Header style={styles.HeaderTitle} >
                            <H3 style={{ color: '#fff', fontWeight: 'bold' }}>
                                {item.postTitle}
                            </H3>
                        </Header>
                        <List style={{ marginVertical: 10, flexDirection: 'row', height: 'auto', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button full onPress={() => { handleFlag() }} iconLeft style={styles.actionButtons} full>
                                <Icon name="flag" />
                                <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'white' }}>Flag</Text>
                            </Button>
                            <Button onPress={() => navigation.navigate('Add Comment'
                            )} iconLeft style={styles.actionButtons} full>
                                <Icon name="chatbubbles" />
                                <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'white' }}>Leave A Comment</Text>
                            </Button>
                        </List>
                        <Content>
                            <List>
                                <ListItem itemDivider>
                                    <Text>Details</Text>
                                </ListItem>
                                <ListItem>
                                    <Left >
                                        <Text style={{ fontWeight: 'bold' }}>Post Status</Text>
                                    </Left>
                                    <Right>
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
                                    </Right>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold' }}>Item Location</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 13 }}>{item.itemLocation}</Text>
                                    </Right>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold' }}>Reward</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 15 }}>{item.rewardValue} EGP</Text>
                                    </Right>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold' }}>Category</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{ fontSize: 13 }}>{item.categoryID.name}</Text>
                                    </Right>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Text>Post Description</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>
                                        {item.postDescription}
                                    </Text>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Text>User Contact</Text>
                                </ListItem>
                                <Content>
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#007AFF" }}>
                                                <Icon active name="person" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>Full Name</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.userID.firstName} {item.userID.lastName}</Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#40916c" }}>
                                                <Icon active name="call" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>Phone Number</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.userID.phoneNumber}</Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#eb5e28" }}>
                                                <Icon active name="location-outline" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>User Address</Text>
                                        </Body>
                                        <Right>
                                            <Text>{item.Location}</Text>
                                        </Right>
                                    </ListItem>
                                </Content>
                                <Content style={{ marginVertical: 10 }}>
                                    <ListItem itemDivider>
                                        <Text>Users Comments</Text>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail square source={{ uri: item.postImage }} />
                                        </Left>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{item.userID.userName}</Text>
                                            <Text note>Its time to build a difference . .
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Button danger>
                                                <Icon name='trash' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail square source={{ uri: item.postImage }} />
                                        </Left>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{item.userID.userName}</Text>
                                            <Text note>Its time to build a difference . .
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Button danger>
                                                <Icon name='trash' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail square source={{ uri: item.postImage }} />
                                        </Left>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{item.userID.userName}</Text>
                                            <Text note>Its time to build a difference . .
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Button danger>
                                                <Icon name='trash' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                </Content>
                            </List>
                        </Content>
                    </ScrollView >
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

const styles = StyleSheet.create({
    HeaderTitle: {
        backgroundColor: '#52b788',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtons: {
        backgroundColor: '#52b788',
        color: '#fff',
        padding: 10,
        borderWidth: 2,
        borderColor: '#52b788',
        alignItems: 'center',
        justifyContent: 'center',
        width: 190
    }
})