import React, { useContext, useState, useCallback } from "react";
import {
    TouchableOpacity,
    ScrollView,
    View,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Right,
    Button,
    Badge,
    Icon,
} from "native-base";
import AuthGlobal from "../../Context/Store/AuthGlobal";
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
var { width, height } = Dimensions.get("window");
export const ViewAllPosts = (props) => {
    let [fontsLoaded] = useFonts({
        "Poppins-Bold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Med": require("../../assets/fonts/Poppins-Medium.ttf"),
    });
    const context = useContext(AuthGlobal);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login");
            } else {
                fetch(`${baseURL}posts/dashboard/${context.stateUser.user.userID}`, {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((response) => {
                        setPostData(response);
                        setLoading(false);
                    })
                    .catch((err) => console.log(err));
            }
            return () => {
                setPostData([]);
            };
        }, [])
    );
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <>
                {
                    postData.length === 0 ?
                        (
                            <View style={styles.searchWrap}>
                                <View>
                                    <Image source={require('../../assets/noposts.png')}
                                        style={{ width: width / 2 + 90, height: height / 2, alignSelf: 'center' }}
                                        resizeMode='cover'
                                    />
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>No Posts Available</Text>
                                </View>
                            </View>
                        )
                        :
                        (
                            loading === false ? (
                                <ScrollView>
                                    <Content>
                                        <List>
                                            {
                                                postData.map((item) => {
                                                    return (
                                                        <ListItem thumbnail key={Math.random()} >
                                                            <Left>
                                                                <Thumbnail
                                                                    square
                                                                    source={{
                                                                        uri:
                                                                            item.postImage == " "
                                                                                ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                                                                : item.postImage,
                                                                    }}
                                                                />
                                                            </Left>
                                                            <Body >
                                                                <Text>{item.userID.userName}</Text>
                                                                <Text >{item.postTitle}</Text>
                                                                {item.postType === true ? (
                                                                    <Badge danger>
                                                                        <Text
                                                                            style={{
                                                                                padding: 5,
                                                                                fontSize: 12,
                                                                                color: "#fff",
                                                                            }}
                                                                        >
                                                                            Lost
                                                                        </Text>
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge success>
                                                                        <Text
                                                                            style={{
                                                                                padding: 5,
                                                                                fontSize: 12,
                                                                                color: "#fff",
                                                                            }}
                                                                        >
                                                                            Found
                                                                        </Text>
                                                                    </Badge>
                                                                )}
                                                            </Body>
                                                            <Right>
                                                                {item.postStatus === true ? (
                                                                    <Text
                                                                        style={{
                                                                            padding: 5,
                                                                            fontSize: 12,
                                                                        }}
                                                                    >
                                                                        Published
                                                                    </Text>
                                                                ) : (
                                                                    <Text
                                                                        style={{
                                                                            padding: 5,
                                                                            fontSize: 12,
                                                                        }}
                                                                    >
                                                                        Pending
                                                                    </Text>
                                                                )}
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Button
                                                                        onPress={() =>
                                                                            props.navigation.navigate("Edit", {
                                                                                item: item,
                                                                            })
                                                                        }
                                                                        style={{
                                                                            backgroundColor: "#52b788",
                                                                            right: 15,
                                                                        }}
                                                                    >
                                                                        <Icon active name="create-outline" />
                                                                    </Button>

                                                                    <Button
                                                                        onPress={() =>
                                                                            props.navigation.navigate("Post Details", {
                                                                                item: item,
                                                                            })
                                                                        }
                                                                        style={{ backgroundColor: "#52b788" }}
                                                                    >
                                                                        <Icon active name="eye" />
                                                                    </Button>
                                                                </View>
                                                            </Right>
                                                        </ListItem>
                                                    );
                                                })
                                            }
                                        </List>
                                    </Content>
                                </ScrollView>

                            )
                                :
                                (
                                    <View style={styles.searchWrap}>
                                        <View>
                                            <Image source={require('../../assets/post_search.jpg')}
                                                style={{ width: width / 2 + 90, height: height / 2 }}
                                                resizeMode='cover'
                                            />
                                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>Search for your posts ..</Text>
                                        </View>
                                    </View>
                                )


                        )
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})