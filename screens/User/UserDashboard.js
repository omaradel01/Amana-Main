import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import AuthGlobal from '../../Context/Store/AuthGlobal'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import baseURL from "../../assets/common/baseURL";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Header, Icon, H3 } from 'native-base';
import { UserCharts } from './UserCharts';
import { UserBarChart } from './UserBarChart';

export const UserDashboard = ({ navigation, route }) => {
    const context = useContext(AuthGlobal)
    const [item, setItem] = useState(route.params.userProfile);
    const [userDef, setUserDef] = useState([])
    const [userLoc, setUserLoc] = useState()
    const [userCat, setUserCat] = useState()
    const [loading, setLoading] = useState(true);
    useFocusEffect((
        useCallback(
            () => {
                fetch(`${baseURL}posts/dashboard/user/${context.stateUser.user.userID}`, { method: "GET" })
                    .then((response) => response.json())
                    .then((response) => {
                        setUserDef(response)
                        setLoading(false)
                        console.log("The User Def", userDef)
                    }).catch(err => console.log(err))
                fetch(`${baseURL}posts/location-stats/${item.userArea.area}`, { method: "GET" })
                    .then((response) => response.json())
                    .then((json) => {
                        setUserLoc(json)
                        console.log("The User Loc", userLoc)
                    }).catch(err => console.log(err))

                fetch(`${baseURL}posts/categories-location-stats/${item.userArea.area}`, { method: "GET" })
                    .then((response) => response.json())
                    .then((json) => {
                        setUserCat(json)
                        console.log("The User Cat", userCat)
                    }).catch(err => console.log(err))
                //// Bie Chart to show Percentage of Found to Percentage of Lost
                console.log(`${baseURL}posts/categories-location-stats/${item.userArea.area}`)
                return () => {
                }
            },
            [],
        )
    ))

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
                {loading === false ?
                    (
                        <ScrollView>
                            <Header style={{ backgroundColor: '#74c69d', borderColor: '#fff', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 25, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    Welcome {context.stateUser.user.userName}
                                </Text>
                            </Header>
                            <Grid>
                                <Row>
                                    <Col style={{ backgroundColor: 'white', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody}>
                                            <Icon name='documents-outline' style={{ fontSize: 45 }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                Lost Posts
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                {userDef.postLostUser}
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{ backgroundColor: '#52b788', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody}
                                        >
                                            <Icon name='documents-outline' style={{ fontSize: 45, color: '#fff' }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                Found Posts
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                {userDef.postFoundUser}
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </Grid>
                            <Text style={{ padding: 10, marginVertical: 20, fontFamily: 'Poppins-Bold', fontSize: 22, textAlign: 'center' }}>
                                Probability To Find an Item inside {item.userArea.area}
                            </Text>
                            <UserCharts
                                userLoc={userLoc}
                            />

                            <Text style={{ padding: 10, marginVertical: 20, fontFamily: 'Poppins-Bold', fontSize: 22, textAlign: 'center' }}>
                                Most Lost Categories inside {item.userArea.area}
                            </Text>
                            <UserBarChart
                                userCat={userCat}
                            />
                            {/* <PieChart /> */}

                            {/* <BarChart
                                data={data}
                                width={screenWidth}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#40916c',
                                    backgroundGradientFrom: '#74c69d',
                                    backgroundGradientTo: '#52b788',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }} /> */}
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

const styles = StyleSheet.create({
    mainBody: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})