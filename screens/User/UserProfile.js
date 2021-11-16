import React, { useContext, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import
baseURL
    from '../../assets/common/baseURL'
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { logoutUser } from '../../Context/Actions/Auth.actions'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export const UserProfile = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }
            else {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        axios
                            .get(`${baseURL}users/${context.stateUser.user.userID}`, {
                                headers: { Authorization: `Bearer ${res}` },
                            })
                            .then((user) => setUserProfile(user.data)).catch((error) => console.log(error))
                    }).catch((error) => console.log(error))
            }
            return () => {
                setUserProfile();
            }
        }, [context.stateUser.isAuthenticated]))
    console.log("the user profile", userProfile)
    if (userProfile === null || userProfile === undefined) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <ActivityIndicator size='large' color='green' />
            </View>
        )
    }
    else {
        if (!fontsLoaded) {
            return <AppLoading />;
        }
        else {
            return (
                < ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar}
                                source={{ uri: userProfile.userImage }} />
                            <Text style={{ ...styles.name, fontFamily: 'Poppins-Med' }}>
                                {userProfile ? userProfile.firstName + ' ' + userProfile.lastName : ''}
                            </Text>
                            <Text style={{ ...styles.userInfo, fontFamily: 'Poppins-Med' }}>{userProfile ? userProfile.EmailAddress : ''}</Text>
                            <Text style={{ ...styles.userInfo, fontFamily: 'Poppins-Med' }}>{userProfile ? userProfile.phoneNumber : ''} </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <TouchableOpacity onPress={() =>
                            props.navigation.navigate("Edit Account", { userProfile: userProfile }
                            )
                        }
                            style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Edit Account</ Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)
                        ]} style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Sign Out</ Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                            props.navigation.navigate("User Dashboard", { userProfile: userProfile }
                            )
                        }
                            style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>My Dashboard</ Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }

}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#52b788",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#fff",
        fontWeight: '600',
    },
    body: {
        alignItems: 'center',
        margin: 10,
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "#FFFFFF",
    },
    btn: {
        height: 50,
        width: 300,
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
    }
});