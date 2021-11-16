import React, { useContext, useState, useCallback } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NotificationCount } from '../screens/Notification/NotificationCount';
// Stacks
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import NotificationsNavigator from './NotificationsNavigator'
import PostNavigator from './PostNavigator'
import SearchNavigator from "./SearchNavigator"
import AuthGlobal from "../Context/Store/AuthGlobal";
const Tab = createBottomTabNavigator();
export const Main = (props) => {
    const context = useContext(AuthGlobal);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: true,
                activeTintColor: "#52b788",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" color={color} size={30} />
                    ),
                }}
            />

            {/* {context.stateUser.user.isAdmin == true ? ( */}
            {context.stateUser.user.isAdmin == false ? (
                <Tab.Screen
                    name="Post"
                    component={PostNavigator}
                    options={{
                        showLabel: true,
                        tabBarIcon: ({ }) => (
                            <Icon
                                style={styles.roundedNav}
                                name="book" size={30} color="white" />
                        ),
                    }}
                />
            ) : null}
            {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="users" color={color} size={30} />
                        ),
                    }}
                />
            ) : null}
            {context.stateUser.isAuthenticated === true ? (
                <Tab.Screen
                    name="Notification"
                    component={NotificationsNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View>
                                <View style={{ position: 'absolute', top: -12, left: 20 }}>
                                    <NotificationCount />
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <Icon style={{ position: 'relative' }} name="bell" color={color} size={30} />
                                </View>

                            </View>


                        ),
                    }}
                />
            ) : null}
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),

                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    roundedNav: {
        width: 60,
        height: 60,
        backgroundColor: '#52b788',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        textAlign: 'center',
        paddingTop: 13,
    },

    notificationLen:
    {

    }


})

