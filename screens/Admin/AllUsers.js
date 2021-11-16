import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, View, ActivityIndicator, Badge, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";
var { width, height } = Dimensions.get('window')
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
export const AllUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            fetch(`${baseURL}users`, { method: "GET" })
                .then((response) => response.json())
                .then((response) => {
                    setUsers(response)
                    console.log(users)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("API ERROR for User Dashboard", error);
                });
            return () => {

            };
        }, [])
    );
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
                    loading === false ?
                        (
                            <ScrollView>
                                {
                                    users.map((item) => {
                                        return (
                                            <Content key={Math.random()} >
                                                <List >
                                                    <ListItem thumbnail  >
                                                        <Left style={{ backgroundColor: '#52b788', padding: 5 }}>
                                                            <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>
                                                                {item.userName}
                                                            </Text>
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ fontFamily: 'Poppins-Med' }}>{item.EmailAddress}</Text>
                                                            <Text note style={{ fontFamily: 'Poppins-Med' }}>{item.phoneNumber}</Text>
                                                        </Body>
                                                        <Right>
                                                            {
                                                                item.isAdmin === true ?
                                                                    (
                                                                        <Text>(Admin)</Text>
                                                                    ) :
                                                                    (
                                                                        null
                                                                    )
                                                            }

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
