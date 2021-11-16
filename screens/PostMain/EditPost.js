import React, { useCallback, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    Button,
    Alert,
    ActivityIndicator,
} from "react-native";
import AuthGlobal from "../../Context/Store/AuthGlobal";
import {
    Content,
    Textarea,
    Form,
    Item,
    Container,
    Input,
    Menu,
    Header,
    Picker,
    VStack,
    Select,
    CheckIcon,
    Center,
    NativeBaseProvider,
    Icon,
    Label,
    Root,
} from "native-base";
import { useFonts } from "expo-font";
import InputIcon from "../../utils/InputIcon";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";

// show password on press on eye
export const EditPost = ({ navigation, route }) => {
    useFonts({
        "Poppins-Bold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Med": require("../../assets/fonts/Poppins-Medium.ttf"),
    });
    const context = useContext(AuthGlobal);
    const [item, setItem] = useState(route.params.item);
    const [rewardValue, setRewardValue] = useState('');
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postImage, setPostImage] = useState('');
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setPostImage(item.postImage);
            setRewardValue(item.rewardValue);
            setPostTitle(item.postTitle);
            setPostDescription(item.postDescription);

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
            setLoading(false);
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res);
                })
                .catch((error) => console.log(error));
            return () => { };
        }, [])
    );
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.uri === null) {
            setPostImage("file:///" + item.userImage);
        }
        if (result.cancelled) {
            setPostImage("file:///" + item.userImage);
        }
        if (!result.cancelled) {
            setPostImage(result.uri);
        }
    };

    (async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    })();
    console.log("------------------------");
    console.log("This is the itemmmmmmmmmmmm", item);
    console.log("post title", postTitle);
    console.log("Post Description", postDescription);
    console.log(
        "This is the image",
        "file:///" + postImage.split("file:/").join("")
    );
    console.log("------------------------");
    console.log("This is the Router", `${baseURL}posts/${item.id}`);
    const EditingThePost = () => {
        if (postTitle === "" || postDescription === "") {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Post Edit Failed",
                text2: "Please Fill In The Required Fields",
            });
            return;
        } else {
            let formData = new FormData();
            if (postImage === null || postImage === "" || postImage === item.postImage || postImage === undefined) {
                formData.append("postImage", item.postImage)
            }
            else {
                const newImageUri = "file:///" + postImage.split("file:/").join("");
                formData.append("postImage", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop()
                });
            }
            formData.append("postTitle", postTitle);
            formData.append("postDescription", postDescription);
            formData.append("rewardValue", rewardValue === '' || rewardValue === null ? 0 : rewardValue);
            console.log(formData);
            axios
                .put(`${baseURL}posts/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Post Edited Successfully",
                        });
                        setTimeout(() => {
                            navigation.navigate("View");
                        }, 500);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Update Failed",
                        text2: "An Error Occured , Please try Again ",

                    });
                });
        }
    };
    return (
        <>
            {loading === false ? (
                <KeyboardAwareScrollView
                    viewIsInsideTabBar={true}
                    extraHeight={200}
                    enableOnAndroid={true}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}
                        contentContainerStyle={styles.container}
                    >
                        <Content style={{ paddingHorizontal: 20 }}>
                            <Form>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="contain"
                                        source={{
                                            uri: postImage
                                        }}
                                        key={postImage.uri}
                                    />
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={styles.imagePicker}
                                    >
                                        <Icon
                                            style={{ color: "white", marginRight: 2 }}
                                            name="camera"
                                        />
                                        <Text style={{ color: "#fff" }}>Upload an Image</Text>
                                    </TouchableOpacity>
                                </View>

                                <Item style={styles.inputContainer}>
                                    <Item>
                                        <Icon
                                            active
                                            name="document-text-outline"
                                            style={{ fontSize: 20 }}
                                        />
                                        <Input
                                            placeholder="Post Title"
                                            value={postTitle}
                                            onChangeText={(text) => setPostTitle(text)}
                                        />
                                    </Item>
                                </Item>
                                <Item style={styles.inputContainer}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <InputIcon
                                            styleColor="#000"
                                            active
                                            IconName="documents-outline"
                                        />
                                        <Label>Post Description</Label>
                                    </View>
                                    <Textarea
                                        rowSpan={10}
                                        style={{ ...styles.textArea, fontFamily: "Poppins-Med" }}
                                        color="#000"
                                        bordered
                                        placeholder="Be Specified About The Time and Place you lost or found the item"
                                        name={"text"}
                                        id={"text"}
                                        value={postDescription}
                                        onChangeText={(text) => setPostDescription(text)}
                                    />
                                </Item>
                                {item.postType === true ?
                                    (
                                        <Item style={styles.inputContainer}>
                                            <Item>
                                                <Icon active name="cash-outline" style={{ fontSize: 20 }} />
                                                <Input
                                                    placeholder="Reward (Optional)"
                                                    value={rewardValue}
                                                    keyboardType="number-pad"
                                                    onChangeText={(text) => setRewardValue(text)}
                                                //.toLowerCase().replace(/[,.-]/g, ''
                                                />
                                            </Item>
                                        </Item>
                                    ) :
                                    null
                                }


                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => EditingThePost()}
                                        style={{ backgroundColor: "#fff", ...styles.btn }}
                                    >
                                        <Text
                                            style={{ fontFamily: "Poppins-Bold", ...styles.btnTxt }}
                                        >
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </Content>
                    </ScrollView>
                </KeyboardAwareScrollView>
            ) : (
                <View
                    style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
                >
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 200,
        borderStyle: "solid",
        borderWidth: 5,
        padding: 0,
        justifyContent: "center",
        borderColor: "#52b788",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 20,
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
        color: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pickercontainer: {
        paddingTop: 0,
        alignItems: "flex-start",
        width: "100%",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: 20,
        flexDirection: "column",
    },
    main: {
        marginVertical: 10,
        height: 250,
        width: 400,
    },
    mainTitle: {
        fontSize: 30,
    },
    inputContainer: {
        marginVertical: 10,
        flexDirection: "column",
        alignItems: "flex-start",
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
        borderColor: "#52b788",
        marginTop: 30,
        justifyContent: "center",
        alignSelf: "center",
    },
    btnTxt: {
        color: "white",
        fontSize: 20,
        color: "#000",
        textAlign: "center",
    },
    textArea: {
        width: "100%",
        marginVertical: 10,
        padding: 5,
        fontSize: 15,
    },
});