import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Badge,
  H3,
  Icon,
  Body,
  Button,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
var { width, height } = Dimensions.get("window");
import baseURL from "../../assets/common/baseURL";
export const PostDetailsForAdmin = ({ navigation, route }) => {
  const [item, setItem] = useState(route.params.item);
  const [username, getUserName] = useState("");
  const [userFirstname, getUserFirstName] = useState("");
  const [userLastName, getUserLastName] = useState("");
  const [CategoryName, getCategoryName] = useState("");
  const [userPhone, getUserPhone] = useState("");
  const [itemLoc, getItemLoc] = useState('')
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetch(`${baseURL}posts/${item._id}`, { method: "GET" })
        .then((response) => response.json())
        .then((response) => {
          getUserName(response.userID.userName);
          getUserFirstName(response.userID.firstName);
          getUserLastName(response.userID.lastName);
          getCategoryName(response.categoryID.name);
          getUserPhone(response.userID.phoneNumber);
          getItemLoc(response.itemLocation.area);
          setLoading(false);
        })
        .catch((error) => {
          console.log("API ERROR for single posts", error);
          console.log(`${baseURL}posts/${item._id}`);
        });
      return () => {
        getUserName();
        getUserFirstName();
        getUserLastName();
        getCategoryName();
      };
    }, [])
  );
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Med": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
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
  const Dconfig = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
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
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Deleted Successfully",
                  text2: "You Will Be Directed To Home Page",
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


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        {loading === false ? (
          <ScrollView style={{ backgroundColor: "#fff", width: width }}>
            <Image
              style={{ height: height / 3, width: width, alignSelf: "center" }}
              resizeMode="contain"
              source={{ uri: item.postImage }}
            ></Image>
            <Header style={styles.HeaderTitle}>
              <H3 style={{ color: "#fff", fontWeight: "bold", fontFamily: 'Poppins-Med' }}>
                {item.postTitle}
              </H3>
            </Header>
            {item.postStatus == false
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
                    style={styles.actionButtons}
                    full>
                    <Icon name="checkmark-outline" />
                    <Text
                      style={{ fontWeight: "bold", marginLeft: 5, color: "white", fontFamily: 'Poppins-Med' }}>
                      Accept Post
                    </Text>
                  </Button>
                  <Button
                    danger
                    onPress={() => DeletePost()}
                    iconLeft
                    style={{ ...styles.actionButtons, backgroundColor: '#ef233c', borderColor: '#ef233c', fontFamily: 'Poppins-Med' }}
                    full
                  >
                    <Icon name="trash-outline" />
                    <Text
                      style={{ fontWeight: "bold", marginLeft: 5, color: "white" }}
                    >
                      Delete Post
                    </Text>
                  </Button>
                </List>
              ) :
              null
            }

            <Content>
              <List>
                <ListItem itemDivider>
                  <Text>Details</Text>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>Post Status</Text>
                  </Left>
                  <Right>
                    {item.postType === true ? (
                      <Badge danger>
                        <Text
                          style={{ padding: 5, fontSize: 12, color: "#fff" }}
                        >
                          Lost
                        </Text>
                      </Badge>
                    ) : (
                      <Badge success style={{ padding: 5, fontSize: 12 }}>
                        <Text>Found</Text>
                      </Badge>
                    )}
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>Item Location</Text>
                  </Left>
                  <Right>
                    <Text style={{ fontSize: 13 }}>{itemLoc}</Text>
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>Reward</Text>
                  </Left>
                  <Right>
                    <Text style={{ fontSize: 15 }}>{item.rewardValue} EGP</Text>
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>Category</Text>
                  </Left>
                  <Right>
                    <Text style={{ fontSize: 13 }}>{CategoryName}</Text>
                  </Right>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Post Description</Text>
                </ListItem>
                <ListItem>
                  <Text>{item.postDescription}</Text>
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
                      <Text>
                        {userFirstname} {userLastName}
                      </Text>
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
                      <Text>{userPhone}</Text>
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
              </List>
            </Content>
          </ScrollView>
        ) : (
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="green" />
          </View>
        )}
      </>
    );
  }
};

const styles = StyleSheet.create({
  HeaderTitle: {
    backgroundColor: "#52b788",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    backgroundColor: "#52b788",
    color: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#52b788",
    alignItems: "center",
    justifyContent: "center",
    width: 190,
  },
});
