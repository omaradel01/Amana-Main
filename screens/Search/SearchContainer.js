import React, { useState, useCallback } from 'react'
import { useFonts } from 'expo-font'
import { useFocusEffect } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { SearchedPosts } from './SearchedPosts'
import baseURL from '../../assets/common/baseURL'
import { Container, Content, Header, Icon, Item, Input, Left, Body, ListItem, Thumbnail } from "native-base";
var { width, height } = Dimensions.get('window')

export const SearchContainer = (props) => {

    // const for inputField 
    const [InputValue, SetInputValue] = useState('')
    const [Posts, setPosts] = useState([]);
    // for searched products
    const [filteredPosts, setFilteredPosts] = useState([])
    // for onFocus and onBlur inside searchbar
    const [Focus, setFocus] = useState()
    // for laoder 
    const [loading, setLoading] = useState(true)
    useFocusEffect((
        useCallback(
            () => {
                // callback
                setFocus(false)
                setLoading(false)
                fetch(`${baseURL}posts`, { method: 'GET' })
                    .then(response => response.json())
                    .then(json => {
                        setPosts(json)
                        setFilteredPosts(json)
                    }).catch((error) => {
                        console.log('API ERROR', error)
                    })
                return () => {
                    setPosts([])
                    setFilteredPosts([])
                    setFocus()
                }
            },
            [],
        )
    ))
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });

    const searchProduct = (text) => {
        setFilteredPosts(
            Posts.filter((i) => i.postTitle.toLowerCase().includes(text.toLowerCase()))
        );
        SetInputValue(text)
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
        SetInputValue('')
    };


    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        return (
            <>
                <ScrollView>
                    <Header searchBar rounded style={{ width: width, backgroundColor: '#74c69d' }}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                placeholder="Search"
                                onFocus={openList}
                                onChangeText={(text) => searchProduct(text)}
                                value={InputValue}
                                style={{ fontFamily: 'Poppins-Med' }}
                            />
                            {Focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
                        </Item>
                    </Header>
                    {Focus == true ? (
                        <ScrollView>
                            <SearchedPosts
                                style={{ backgroundColor: 'white', height: height, marginTop: 10 }}
                                filteredPosts={filteredPosts}
                                navigation={props.navigation}
                            />
                        </ScrollView>
                    ) : (
                        <View style={styles.searchWrap}>
                            <View>
                                <Image source={require('../../assets/post_search.jpg')}
                                    style={{ width: width / 2 + 90, height: height / 2 }}
                                    resizeMode='cover'
                                />
                                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>Search for your posts ..</Text>
                            </View>
                        </View>
                    )}

                </ScrollView>
            </>
        )
    }
}



const styles = StyleSheet.create({
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})