import React, { useCallback, useState, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native'
import {
    ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Button, Alert, ActivityIndicator
} from "react-native";
import AuthGlobal from '../../Context/Store/AuthGlobal'
import {
    Content, Textarea, Form, Item, Container, Root, Input, Menu, Header, Picker, VStack, Select, CheckIcon, Center, NativeBaseProvider, Icon, Label,
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
export const AddNewPost = (props) => {
    useFonts({
        "Poppins-Bold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Med": require("../../assets/fonts/Poppins-Medium.ttf"),
    });
    const context = useContext(AuthGlobal)
    const [accessories, setAccessories] = useState('60bc789ac0bef129a86b9fa6')
    const [devices, setDevices] = useState('60bd24c0edbc020f48ba09ba')
    const [personalBelongings, setPersonalBelongings] = useState('60bd607fedbc020f48ba09bc')
    const [Bags, setBags] = useState('60bd24c8edbc020f48ba09bb')
    const [ssn, setSSN] = useState('')
    const [brand, setBrand] = useState('')
    const [size, setSize] = useState('')
    const [accType, setAccType] = useState('')
    const [bagType, setBagType] = useState('')
    const [color, setColor] = useState('')
    const [PB_type, setPBType] = useState('')
    const [allAreas, getAllAreas] = useState([])
    const [CategoryValue, setCategoryValue] = useState('60bc789ac0bef129a86b9fa6')
    const [rewardValue, setRewardValue] = useState('');
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [Location, setLocation] = useState("60f621737eab5c551c722f03");
    const [postType, setPostType] = useState(false);
    const [postImage, setPostImage] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true)

    const onCategorySelection = (value) => {
        setCategoryValue(value)
    }

    const onPostTypeSelection = (value) => {
        setPostType(value)
    }

    const onLocationSelection = (value) => {
        setLocation(value)
    }

    const onBagTypeCategory = (value) => {
        setBagType(value)
    }

    const onPersonalBelongingSelection = (value) => {
        setPBType(value)
    }

    useFocusEffect((
        useCallback(
            () => {
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
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error));
                fetch(`${baseURL}locations`, {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((response) => {
                        getAllAreas(response);
                        setLoading(false);
                    })
                    .catch((err) => console.log(err));
                return () => {
                    getAllAreas([]);
                };

            },
            [],
        )
    ))
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
    console.log('------------------------')
    console.log('post type', postType)
    console.log('post title', postTitle)
    console.log('category type', CategoryValue)
    console.log('Location', Location)
    console.log('Bag type', bagType)
    console.log('personal belongings', PB_type)
    console.log('Post Description', postDescription)
    console.log('------------------------')

    const CreatePost = () => {
        if (
            postTitle === "" ||
            Location === "" ||
            CategoryValue === "" ||
            postDescription === "" ||
            postType === ""
        ) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Post Submit Failed",
                text2: "Please Fill In The Required Fields"
            });
            console.log(postType)
            return
        }
        else {
            let formData = new FormData();

            if (postImage === null || postImage === "") {
                formData.append("postImage", "")
            }
            else {
                const newImageUri = "file:///" + postImage.split("file:/").join("");
                formData.append("postImage", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop()
                });
            }
            formData.append("postType", postType);
            formData.append("itemLocation", Location);
            formData.append("postTitle", postTitle);
            formData.append("userID", context.stateUser.user.userID);
            formData.append("categoryID", CategoryValue);
            formData.append("postDescription", postDescription);
            formData.append("rewardValue", rewardValue === '' ? 0 : rewardValue);
            formData.append("ssn", ssn == '' ? 'Not Defined' : ssn);
            formData.append("DeviceBrand", brand == '' ? 'Not Defined' : brand);
            formData.append("Size", size === '' ? 0 : size);
            formData.append("accessoryType", accType == '' ? 'Not Defined' : accType);
            formData.append("bagType", bagType == '' ? 'Not Defined' : bagType);
            formData.append("PB_type", PB_type == '' ? 'Not Defined' : PB_type);
            formData.append("color", color == '' ? 'Not Defined' : color);
            console.log(formData)
            axios.post(`${baseURL}posts`, formData, config)
                .then((res) => {
                    if (res.status == 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Post Submitted Successfully",
                        });
                        setTimeout(() => {
                            props.navigation.navigate("View");
                        }, 500);
                    }
                    return
                })
                .catch((error) => {
                    console.log(error.message);
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Submittion error",
                    });
                    return
                });
        }
    };
    return (
        <>
            {loading === false ? (
                <KeyboardAwareScrollView
                    viewIsInsideTabBar={true}
                    extraHeight={200}
                    enableOnAndroid={true}>
                    <ScrollView showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}
                        contentContainerStyle={styles.container} >
                        <Content style={{ paddingHorizontal: 20 }}>
                            <Form>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} resizeMode="contain" source={{
                                        uri: postImage === '' ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640' : postImage
                                    }}
                                    />
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={styles.imagePicker}>
                                        <Icon style={{ color: "white", marginRight: 2 }} name="camera" />
                                        <Text style={{ color: '#fff' }}>Upload an Image</Text>
                                    </TouchableOpacity>
                                </View>
                                <Item style={styles.inputContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <InputIcon
                                            color="#52b788"
                                            styleColor="#000"
                                            active
                                            IconName="checkmark-circle-outline"
                                        />
                                        <Label>Post Type</Label>
                                    </View>
                                    <View style={styles.pickercontainer}>
                                        <Picker
                                            iosIcon={<Icon name="arrow-down" />}
                                            mode={"dropdown"}
                                            selectedValue={postType}
                                            style={{ height: 50, width: '100%', fontSize: 30 }}
                                            onValueChange={(value) =>
                                                onPostTypeSelection(value)
                                            }>
                                            <Picker.Item label="Lost" value={true} />
                                            <Picker.Item label="Found" value={false} />
                                        </Picker>
                                    </View>
                                </Item>
                                <Item style={styles.inputContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <InputIcon
                                            color="#52b788"
                                            styleColor="#000"
                                            active
                                            IconName="checkmark-circle-outline"
                                        />
                                        <Label>Item Location</Label>
                                    </View>
                                    <View style={styles.pickercontainer}>
                                        <Picker
                                            iosIcon={<Icon name="arrow-down" />}
                                            mode={"dropdown"}
                                            selectedValue={Location}
                                            style={{ height: 50, width: '100%', fontSize: 30 }}
                                            onValueChange={(value) =>
                                                onLocationSelection(value)
                                            }
                                        >
                                            {
                                                allAreas.map(item =>
                                                    <Picker.Item label={item.area.toString()} value={item.id.toString()} key={Math.random()} />
                                                )
                                            }
                                        </Picker>
                                    </View>
                                </Item>

                                <Item style={styles.inputContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <InputIcon
                                            color="#52b788"
                                            styleColor="#000"
                                            active
                                            IconName="menu-outline"
                                        />
                                        <Label>Post Category</Label>
                                    </View>

                                    <View style={styles.pickercontainer} >
                                        <Picker
                                            iosIcon={<Icon name="arrow-down" />}
                                            selectedValue={CategoryValue}
                                            style={{ height: 50, width: '100%', fontSize: 30 }}
                                            onValueChange={(value) =>
                                                onCategorySelection(value)
                                            }>
                                            <Picker.Item label="Accessories" value="60bc789ac0bef129a86b9fa6" />
                                            <Picker.Item label="Devices" value="60bd24c0edbc020f48ba09ba" />
                                            <Picker.Item label="Bags" value="60bd24c8edbc020f48ba09bb" />
                                            <Picker.Item
                                                label="Personal Belongings"
                                                value="60bd607fedbc020f48ba09bc"
                                            />
                                        </Picker>
                                    </View>
                                </Item>
                                <Item style={styles.inputContainer}>
                                    <Item>
                                        <Icon active name='document-text-outline' style={{ fontSize: 20 }} />
                                        <Input placeholder='Post Title'
                                            value={postTitle}
                                            onChangeText={(text) => setPostTitle(text)}
                                        />
                                    </Item>
                                </Item>
                                <Item style={styles.inputContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <InputIcon
                                            styleColor="#000"
                                            active
                                            IconName="documents-outline"
                                        />
                                        <Label>Post Description</Label>
                                    </View>
                                    <Textarea rowSpan={10}
                                        style={{ ...styles.textArea, fontFamily: 'Poppins-Med' }}
                                        color='#000'
                                        bordered
                                        placeholder="Be Specified About The Time and Place you lost or found the item"
                                        name={"text"}
                                        id={"text"}
                                        value={postDescription}
                                        onChangeText={(text) => setPostDescription(text)}
                                    />
                                </Item>
                                {
                                    postType === true ?
                                        (
                                            <>
                                                <Item style={styles.inputContainer}>
                                                    <Item>
                                                        <Icon active name='cash-outline' style={{ fontSize: 20 }} />
                                                        <Input placeholder='Reward (Optional)'
                                                            value={rewardValue}
                                                            keyboardType="number-pad"
                                                            onChangeText={(text) => setRewardValue(text)}
                                                        //.toLowerCase().replace(/[,.-]/g, ''
                                                        />
                                                    </Item>
                                                </Item>
                                            </>
                                        )
                                        :
                                        <>
                                        </>
                                }
                                {
                                    CategoryValue === accessories ?
                                        (
                                            <>
                                                <Item style={styles.inputContainer}>
                                                    <Item>
                                                        <Icon active name='expand-outline' style={{ fontSize: 20 }} />
                                                        <Input placeholder='Size (Optional)'
                                                            value={size}
                                                            onChangeText={(text) => setSize(text)}
                                                        />
                                                    </Item>
                                                </Item>
                                                <Item style={styles.inputContainer}>
                                                    <Item>
                                                        <Icon active name='headset-outline' style={{ fontSize: 20 }} />
                                                        <Input placeholder='Accessory Type (Optional)'
                                                            value={accType}
                                                            onChangeText={(text) => setAccType(text)}
                                                        />
                                                    </Item>
                                                </Item>
                                            </>
                                        ) :
                                        CategoryValue === devices ?
                                            (
                                                <>
                                                    <Item style={styles.inputContainer}>
                                                        <Item>
                                                            <Icon active name='code-working-outline' style={{ fontSize: 20 }} />
                                                            <Input placeholder='SSN (Optional)'
                                                                value={ssn}
                                                                onChangeText={(text) => setSSN(text)}
                                                            />
                                                        </Item>
                                                    </Item>
                                                    <Item style={styles.inputContainer}>
                                                        <Item>
                                                            <Icon active name='phone-portrait-outline' style={{ fontSize: 20 }} />
                                                            <Input placeholder='Brand (Optional)'
                                                                value={brand}
                                                                onChangeText={(text) => setBrand(text)}
                                                            />
                                                        </Item>
                                                    </Item>
                                                </>
                                            ) :
                                            CategoryValue === Bags ?
                                                (
                                                    <>
                                                        <Item style={styles.inputContainer}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                                <InputIcon
                                                                    color="#52b788"
                                                                    styleColor="#000"
                                                                    active
                                                                    IconName="basket-outline"
                                                                />
                                                                <Label>Bag's Type</Label>
                                                            </View>

                                                            <View style={styles.pickercontainer} >
                                                                <Picker
                                                                    textStyle={{ fontSize: 20 }}
                                                                    iosIcon={<Icon name="arrow-down" />}
                                                                    mode={"dropdown"}
                                                                    selectedValue={bagType}
                                                                    itemTextStyle={{ fontSize: 20 }}
                                                                    style={{ height: 50, width: '100%', fontSize: 30 }}
                                                                    onValueChange={(value) =>
                                                                        onBagTypeCategory(value)
                                                                    }>
                                                                    <Picker.Item label="Leather" value="Leather" />
                                                                    <Picker.Item label="Laptop Bag" value="Laptop Bag" />
                                                                    <Picker.Item label="Formal Bag" value="Formal Bag" />
                                                                    <Picker.Item label="School Bag" value="School Bag" />
                                                                </Picker>
                                                            </View>
                                                        </Item>
                                                    </>
                                                ) :
                                                CategoryValue === personalBelongings ?
                                                    (
                                                        <>
                                                            <Item style={styles.inputContainer}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <InputIcon
                                                                        color="#52b788"
                                                                        styleColor="#000"
                                                                        active
                                                                        IconName="file-tray-full-outline"
                                                                    />
                                                                    <Label>Belonging Type</Label>
                                                                </View>

                                                                <View style={styles.pickercontainer} >
                                                                    <Picker
                                                                        textStyle={{ fontSize: 20 }}
                                                                        iosIcon={<Icon name="arrow-down" />}
                                                                        itemTextStyle={{ fontSize: 20, color: "#000" }}
                                                                        mode={"dropdown"}
                                                                        selectedValue={PB_type}
                                                                        itemTextStyle={{ fontSize: 20 }}
                                                                        style={{ height: 50, width: '100%', fontSize: 30 }}
                                                                        onValueChange={(value) =>
                                                                            onPersonalBelongingSelection(value)
                                                                        }>
                                                                        <Picker.Item label="ID" value="ID" />
                                                                        <Picker.Item label="Flash Drive" value="Flash Drive" />
                                                                        <Picker.Item label="Personal Files" value="Personal Files" />
                                                                    </Picker>
                                                                </View>
                                                            </Item>
                                                        </>
                                                    ) :
                                                    null
                                }

                                <Item style={styles.inputContainer}>
                                    <Item>
                                        <Icon active name='color-palette-outline' style={{ fontSize: 20 }} />
                                        <Input placeholder='Color (Optional)'
                                            value={color}
                                            onChangeText={(text) => setColor(text)}
                                        //.toLowerCase().replace(/[,.-]/g, ''
                                        />
                                    </Item>
                                </Item>
                                <View style={{ marginVertical: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => CreatePost()}
                                        style={{ backgroundColor: "#fff", ...styles.btn }}
                                    >
                                        <Text style={{ fontFamily: "Poppins-Bold", ...styles.btnTxt }}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>
                        </Content>
                    </ScrollView>
                </KeyboardAwareScrollView >

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


const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 200,
        borderStyle: "solid",
        borderWidth: 5,
        padding: 0,
        justifyContent: "center",
        borderColor: "#52b788",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 20
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
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickercontainer: {
        paddingTop: 0,
        alignItems: "flex-start",
        width: '100%'
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: 20,
        flexDirection: 'column'
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
        flexDirection: 'column',
        alignItems: 'flex-start'
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
        width: '100%',
        marginVertical: 10,
        padding: 5,
        fontSize: 15
    },
});