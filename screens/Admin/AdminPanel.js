import React, { useCallback, useState, useContext } from 'react';
import { Header, Icon, H3 } from 'native-base';
import { useFocusEffect } from "@react-navigation/native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import baseURL from "../../assets/common/baseURL";

export const AdminPanel = (props) => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthGlobal)
    useFocusEffect(
        useCallback(() => {
            fetch(`${baseURL}posts/admin/dash`, { method: "GET" })
                .then((response) => response.json())
                .then((response) => {
                    setItem(response)
                    console.log(item)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("API ERROR for Admin Dashboard", error);
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
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            props.navigation.navigate('Lost Posts')
                                        }}>
                                            <Icon name='documents-outline' style={{ fontSize: 45 }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                Lost Posts
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                {item.Lostposts}
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{ backgroundColor: '#52b788', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            console.log('Done')
                                            props.navigation.navigate('Found Posts')
                                        }}>
                                            <Icon name='documents-outline' style={{ fontSize: 45, color: '#fff' }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                Found Posts
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                {item.FoundPosts}
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: '#52b788', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            props.navigation.navigate('post')
                                        }}>
                                            <Icon name='documents-outline' style={{ fontSize: 45, color: '#fff' }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                Pending Posts
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }} >
                                                {item.PendingPosts}
                                            </Text>
                                        </TouchableOpacity>

                                    </Col>
                                    <Col style={{ backgroundColor: '#fff', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            props.navigation.navigate('All Users')
                                        }}>
                                            <Icon name='people-outline' style={{ fontSize: 45 }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                Users
                                            </Text>
                                            <Text>
                                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                    {item.AllUsers}
                                                </Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ backgroundColor: '#fff', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            props.navigation.navigate('All Categories')
                                        }}>
                                            <Icon name='menu-outline' style={{ fontSize: 45, }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                Categories
                                            </Text>
                                            <Text>
                                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                                                    {item.AllCategories}
                                                </Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{ backgroundColor: '#52b788', height: 150, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.mainBody} onPress={() => {
                                            props.navigation.navigate('All Locations')
                                        }}>
                                            <Icon name='location-outline' style={{ fontSize: 45, color: '#fff' }} />
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                Locations
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff' }}>
                                                {item.AllLocation}
                                            </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </Grid>
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