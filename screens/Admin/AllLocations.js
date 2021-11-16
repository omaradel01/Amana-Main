import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, View, ActivityIndicator, Badge, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";
var { width, height } = Dimensions.get('window')
import { Content, List, ListItem, Text, Left, Body } from 'native-base';
export const AllLocations = (props) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            fetch(`${baseURL}locations`, { method: "GET" })
                .then((response) => response.json())
                .then((response) => {
                    setLocations(response)
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
                                    locations.map((item, index) => {
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
                                                            <Text style={{ fontFamily: 'Poppins-Med' }}>{item.area}</Text>
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
