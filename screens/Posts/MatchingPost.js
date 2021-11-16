import React, { useState, useEffect, useCallback, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from '@react-navigation/native'
import { Image, View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Badge, H3, Icon, Body, Button, Thumbnail } from 'native-base';
import Toast from 'react-native-toast-message';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
var { width, height } = Dimensions.get('window')
import baseURL from '../../assets/common/baseURL'
export const MatchingPost = ({ navigation, route }) => {
    const context = useContext(AuthGlobal)
    const [item, setItem] = useState(route.params.postID);
    const [username, getUserName] = useState('')
    const [user_id, getUserID] = useState('')
    const [userFirstname, getUserFirstName] = useState('')
    const [userLastName, getUserLastName] = useState('')
    const [CategoryName, getCategoryName] = useState('')
    const [userPhone, getUserPhone] = useState('')
    const [userAdmin, getUserAdmin] = useState()
    const [itemLoc, getItemLoc] = useState('')
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState();
    useFocusEffect((
        useCallback(
            () => {
                console.log("The Item", item)
                fetch(`${baseURL}posts/${item._id}/matchpost`, { method: 'GET' })
                    .then(response => response.json())
                    .then(response => {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Matching Post Found!!",
                        });
                        console.log('the response of match', response)
                        setItem(response)
                        getUserID(response.userID._id)
                        getUserName(response.userID.userName)
                        getUserFirstName(response.userID.firstName)
                        getUserLastName(response.userID.lastName)
                        getCategoryName(response.categoryID.name)
                        getUserPhone(response.userID.phoneNumber)
                        getUserAdmin(response.userID.isAdmin)
                        getItemLoc(response.itemLocation.area)
                        // console.log("The user admin", response.userID.isAdmin)
                        setLoading(false)
                    }).catch((error) => {
                        console.log('API ERROR for Matching posts', error)
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "There is No Matching Posts Yet",
                        });
                        setTimeout(() => {
                            navigation.navigate("Post Details");
                        }, 1500);
                    })
                return () => {
                    getUserName()
                    getUserFirstName()
                    getUserLastName()
                    getCategoryName()
                }
            },
            [])
    ))
    AsyncStorage.getItem("jwt")
        .then((res) => {
            setToken(res)
        })
        .catch((error) => console.log(error))
    const config = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    let request = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    let deleteRequest = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const Dconfig = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const handleFlag = () => {
        fetch(`${baseURL}posts/flags/${item._id}`, request)
            .then(response => {
                if (response.status == 200 || response.status === 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Flagged successfully",
                    });
                    setTimeout(() => {
                        navigation.navigate("Home");
                    }, 500);
                }
                else if (response.status == 400) {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Post Already Flagged",
                    });
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUnflag = () => {
        fetch(`${baseURL}posts/unflags/${item._id}`, request)
            .then(response => {
                if (response.status == 200 || response.status === 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "unFlagged successfully",
                    });
                    setTimeout(() => {
                        navigation.navigate("Home");
                    }, 500);
                }
                else if (response.status == 400) {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Post Has Not been Flagged",
                    });
                }
            }).catch((error) => {
                console.log(error)
            })
    }


    const deleteComment = (pid, cid) => {
        Alert.alert(
            "Delete Comment",
            "Are You Sure You want to Delete this Comment ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        fetch(`${baseURL}posts/comments/${pid}/${cid}`, deleteRequest)
                            .then(response => {
                                if (response.status == 200 || response.status === 201) {
                                    Toast.show({
                                        topOffset: 60,
                                        type: "success",
                                        text1: "Deleted successfully",
                                    });
                                    setTimeout(() => {
                                        navigation.navigate("Home");
                                    }, 500);
                                }
                                else if (response.status == 400 || response.status == 401) {
                                    Toast.show({
                                        topOffset: 60,
                                        type: "error",
                                        text1: "Comment is Not Found",
                                    });
                                }
                            }).catch((error) => {
                                console.log(error)
                            })
                    }
                }
            ],
            { cancelable: false }
        );
    }
    const AcceptPost = () => {
        Alert.alert(
            "Publish Post",
            "Are You Sure You want to Publish this Post ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        console.log('ok')
                        fetch(`${baseURL}posts/admin/${item._id}`, config)
                            .then((response) => response.json())
                            .then((response) => {
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: "Published Successfull",
                                    text2: "You Will Be Directed To Admin Page",
                                });
                                setTimeout(() => {
                                    navigation.navigate("post");
                                }, 2000);
                            }).catch((err) => console.log(err))
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const DeletePost = () => {
        Alert.alert(
            "Publish Post",
            "Are You Sure You want to Delete this Post ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        console.log('ok')
                        fetch(`${baseURL}posts/admin/${item._id}`, Dconfig)
                            .then((response) => response.json())
                            .then((response) => {
                                if (response.status === 200 || response.status === 201) {
                                    Toast.show({
                                        topOffset: 60,
                                        type: "success",
                                        text1: "Deleted Successfully",
                                        text2: "You Will Be Directed To Admin Page",
                                    });
                                }
                                setTimeout(() => {
                                    navigation.navigate("post");
                                }, 2000);

                            }).catch((err) => console.log(err))
                    }
                }
            ],
            { cancelable: false }
        );
    }
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {

        if (item === null) {
            return (
                <View>
                    <Text>
                        No Matching Posts Yet
                    </Text>
                </View>
            )
        }
        else {
            return (
                <>
                    {loading === false ? (
                        <ScrollView style={{ backgroundColor: '#fff', width: width }}>
                            <Image style={{ height: height / 3, width: width, alignSelf: 'center' }} resizeMode="contain" source={{ uri: item.postImage }}>
                            </Image>
                            <Header style={styles.HeaderTitle} >
                                <H3 style={{ color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    {item.postTitle}
                                </H3>
                            </Header>
                            {context.stateUser.user.isAdmin === false ?
                                (<List style={{ marginVertical: 10, flexDirection: 'row', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                                    {context.stateUser.user.userID !== item.userID._id ?
                                        (
                                            <List style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Button full onPress={() => { handleFlag() }} iconLeft style={styles.actionButtons} full>
                                                    <Icon name="flag" />
                                                    <Text style={{ marginHorizontal: 8, color: 'white', fontFamily: 'Poppins-Med' }}>Flag</Text>
                                                    <Text style={{ color: 'white', fontFamily: 'Poppins-Med' }}>
                                                        ({item.flags.length})
                                                    </Text>
                                                </Button>
                                                <Button full onPress={() => { handleUnflag() }} iconLeft style={styles.actionButtons} full>
                                                    <Icon name="flag" />
                                                    <Text style={{ marginHorizontal: 8, color: 'white', fontFamily: 'Poppins-Med' }}>Unflag</Text>
                                                </Button>
                                            </List>
                                        ) :
                                        (
                                            <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                                <Button block onPress={() => navigation.navigate('Matching Post', { postID: item })} iconLeft style={{ ...styles.actionButtons, alignSelf: 'center', justifyContent: 'center', width: 200 }} full>
                                                    <Icon name="link-outline" style={{ marginRight: 5 }} />
                                                    <Text style={{ marginHorizontal: 8, color: 'white', fontFamily: 'Poppins-Med', fontSize: 12 }}>Check Matching Post </Text>
                                                </Button>
                                            </View>
                                        )
                                    }
                                    <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                        <Button block onPress={() => navigation.navigate('Add Comment', { postID: item._id })} iconLeft style={{ ...styles.actionButtons, alignSelf: 'center', justifyContent: 'center' }} full>
                                            <Icon name="chatbubbles" style={{ marginRight: 5 }} />
                                            <Text style={{ marginHorizontal: 8, color: 'white', fontFamily: 'Poppins-Med', fontSize: 12 }}>Comment</Text>
                                        </Button>
                                    </View>


                                </List>
                                ) :
                                (
                                    item.postStatus == false
                                        ? (
                                            <List
                                                style={{
                                                    marginVertical: 10,
                                                    flexDirection: "row",
                                                    height: "auto",
                                                    justifyContent: "space-around",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Button
                                                    full
                                                    onPress={() => {
                                                        AcceptPost();
                                                    }}
                                                    iconLeft
                                                    style={styles.actionButtonsAdmin}
                                                    block>
                                                    <Icon name="checkmark-outline" />
                                                    <Text
                                                        style={{ fontFamily: 'Poppins-Bold', marginLeft: 5, color: "white" }}>
                                                        Accept Post
                                                    </Text>
                                                </Button>
                                                <Button
                                                    danger
                                                    onPress={() => DeletePost()}
                                                    iconLeft
                                                    style={{ ...styles.actionButtonsAdmin, backgroundColor: '#ef233c', borderColor: '#ef233c', fontFamily: 'Poppins-Med' }}
                                                    full
                                                >
                                                    <Icon name="trash-outline" />
                                                    <Text
                                                        style={{ fontFamily: 'Poppins-Bold', marginLeft: 5, color: "white" }}
                                                    >
                                                        Delete Post
                                                    </Text>
                                                </Button>
                                            </List>
                                        ) :
                                        context.stateUser.user.isAdmin === true ?
                                            (
                                                <List
                                                    style={{
                                                        marginVertical: 10,
                                                        flexDirection: "row",
                                                        height: "auto",
                                                        justifyContent: "space-around",
                                                        alignItems: "center",
                                                    }}
                                                >

                                                    <Button onPress={() => navigation.navigate('Add Comment', { postID: item._id })} iconLeft style={styles.actionButtonsAdmin} full>
                                                        <Icon name="chatbubbles" />
                                                        <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'white' }}>Comment As Admin</Text>
                                                    </Button>
                                                </List>

                                            )
                                            : (
                                                null
                                            )
                                )
                            }
                            <Content>
                                <List>
                                    <ListItem itemDivider>
                                        <Text style={{ fontFamily: 'Poppins-Med' }}>Details</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Left >
                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Post Status</Text>
                                        </Left>
                                        <Right>
                                            {item.postType === true ?
                                                <Badge danger >
                                                    <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>
                                                        Lost
                                                    </Text>
                                                </Badge>
                                                :
                                                <Badge success >
                                                    <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>Found</Text>
                                                </Badge>
                                            }
                                        </Right>
                                    </ListItem>
                                    <ListItem>
                                        <Left>
                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Item Location</Text>
                                        </Left>
                                        <Right>
                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{itemLoc}</Text>
                                        </Right>
                                    </ListItem>

                                    {
                                        CategoryName === 'Accessories' ?
                                            (
                                                <List>
                                                    <ListItem>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Category</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{CategoryName}</Text>
                                                        </Right>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Size</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.size == null || item.size == '' ? 0 : item.size}</Text>
                                                        </Right>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Left>
                                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Accessory Type</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.accessoryType}</Text>
                                                        </Right>
                                                    </ListItem>
                                                </List>

                                            )
                                            :
                                            CategoryName === 'Devices' ?
                                                (
                                                    <List>
                                                        <ListItem>
                                                            <Left>
                                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Category</Text>
                                                            </Left>
                                                            <Right>
                                                                <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{CategoryName}</Text>
                                                            </Right>
                                                        </ListItem>
                                                        <ListItem>
                                                            <Left>
                                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>SSN</Text>
                                                            </Left>
                                                            <Right>
                                                                <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.ssn}</Text>
                                                            </Right>
                                                        </ListItem>
                                                        <ListItem>
                                                            <Left>
                                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Brand</Text>
                                                            </Left>
                                                            <Right>
                                                                <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.DeviceBrand}</Text>
                                                            </Right>
                                                        </ListItem>
                                                    </List>
                                                )
                                                :
                                                CategoryName === 'Bags' ?
                                                    (
                                                        <List>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'Poppins-Bold' }}>Category</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{CategoryName}</Text>
                                                                </Right>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Left>
                                                                    <Text style={{ fontFamily: 'Poppins-Bold' }}>Bag's Type</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.bagType}</Text>
                                                                </Right>
                                                            </ListItem>
                                                        </List>
                                                    )
                                                    :
                                                    CategoryName === 'Personal Belongings' ?
                                                        (
                                                            <List>
                                                                <ListItem>
                                                                    <Left>
                                                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Category</Text>
                                                                    </Left>
                                                                    <Right>
                                                                        <Text style={{ fontSize: 13, width: 150, left: 30, fontFamily: 'Poppins-Med' }}>{CategoryName}</Text>
                                                                    </Right>
                                                                </ListItem>
                                                                <ListItem >
                                                                    <Left>
                                                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Belonging Type</Text>
                                                                    </Left>
                                                                    <Right>
                                                                        <Text style={{ fontSize: 13, width: 110, left: 30, fontFamily: 'Poppins-Med' }}>{item.PB_type}</Text>
                                                                    </Right>
                                                                </ListItem>
                                                            </List>
                                                        ) :
                                                        null
                                    }

                                    {item.postType === true ?

                                        (
                                            <List>
                                                <ListItem>
                                                    <Left>
                                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Reward</Text>
                                                    </Left>
                                                    <Right>
                                                        <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.rewardValue}</Text>
                                                    </Right>
                                                </ListItem>
                                            </List>
                                        ) :
                                        (
                                            null
                                        )
                                    }
                                    <ListItem>
                                        <Left>
                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Color</Text>
                                        </Left>
                                        <Right>
                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Med' }}>{item.color}</Text>
                                        </Right>
                                    </ListItem>

                                    <ListItem itemDivider>
                                        <Text style={{ fontFamily: 'Poppins-Med' }}>Post Description</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text style={{ fontFamily: 'Poppins-Med' }}>
                                            {item.postDescription}
                                        </Text>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>User Contact</Text>
                                    </ListItem>
                                    <Content>
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: "#007AFF" }}>
                                                    <Icon active name="person" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Full Name</Text>
                                            </Body>
                                            <Right>
                                                <Text style={{ fontFamily: 'Poppins-Med' }}>{userFirstname} {userLastName}</Text>
                                            </Right>
                                        </ListItem>
                                        <ListItem icon>
                                            <Left>
                                                <Button style={{ backgroundColor: "#40916c" }}>
                                                    <Icon active name="call" />
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Phone Number</Text>
                                            </Body>
                                            <Right>
                                                <Text style={{ fontFamily: 'Poppins-Med' }}>{userPhone}</Text>
                                            </Right>
                                        </ListItem>
                                    </Content>
                                    <Content style={{ marginVertical: 10 }}>
                                        <ListItem itemDivider>
                                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Users Comments</Text>
                                        </ListItem>
                                        {item.comments.length > 0 ? (
                                            <View>
                                                {item.comments.map((items) => {
                                                    console.log(items.user)
                                                    return (
                                                        <ListItem thumbnail key={items._id}>
                                                            <Left>
                                                                <Thumbnail square source={{ uri: items.userImage }} />
                                                            </Left>
                                                            <Body>
                                                                {items.admin == true ?
                                                                    (
                                                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Admin</Text>
                                                                    ) :
                                                                    (
                                                                        <Text style={{ fontFamily: 'Poppins-Bold' }}>{items.username}</Text>
                                                                    )
                                                                }
                                                                <Text style={{ fontFamily: 'Poppins-Med' }} note>{items.text}
                                                                </Text>
                                                            </Body>
                                                            <Right>
                                                                {
                                                                    context.stateUser.user.isAdmin === true || user_id === context.stateUser.user.userID ?
                                                                        (<Button danger onPress={() => { deleteComment(item._id, items._id) }}>
                                                                            <Icon name='trash' />
                                                                        </Button>)
                                                                        :
                                                                        items.user === context.stateUser.user.userID ?
                                                                            (
                                                                                <Button danger onPress={() => { deleteComment(item._id, items._id) }}>
                                                                                    <Icon name='trash' />
                                                                                </Button>
                                                                            )
                                                                            :
                                                                            (
                                                                                null
                                                                            )
                                                                }

                                                            </Right>
                                                        </ListItem>
                                                    )
                                                })}
                                            </View>
                                        ) : (
                                            <View style={styles.searchWrap}>
                                                <View>
                                                    <Image source={require('../../assets/speech-bubble.png')}
                                                        style={{ width: 100, height: 100, alignSelf: 'center' }}
                                                        resizeMode='cover'
                                                    />
                                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>No Comments Yet</Text>
                                                </View>
                                            </View>
                                        )}
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
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#52b788',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 120
    },
    actionButtonsAdmin: {
        backgroundColor: '#52b788',
        color: '#fff',
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#52b788',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 200
    },
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 200,
        justifyContent: 'center',
        textAlign: 'center'
    }
})