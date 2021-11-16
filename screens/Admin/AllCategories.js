import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, View, ActivityIndicator, Badge, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";
var { width, height } = Dimensions.get('window')
import { Container, Header, Content, List, ListItem, Text, Left, Body } from 'native-base';
export const AllCategories = (props) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            fetch(`${baseURL}categories`, { method: "GET" })
                .then((response) => response.json())
                .then((response) => {
                    setCategories(response)
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
                                    categories.map((item, index) => {
                                        return (
                                            <Content key={Math.random()} >
                                                <List >
                                                    <ListItem thumbnail  >
                                                        <Left style={{ backgroundColor: '#52b788', padding: 5 }}>
                                                            <Text style={{ padding: 5, fontSize: 12, color: '#fff', fontFamily: 'Poppins-Med' }}>
                                                                {index + 1}
                                                            </Text>
                                                        </Left>
                                                        <Body>
                                                            <Text style={{ fontFamily: 'Poppins-Med' }}>{item.name}</Text>
                                                        </Body>
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
