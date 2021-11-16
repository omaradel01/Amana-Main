import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native'
import { Container, Content, Header, Icon, Item, Input, Left, Body, ListItem, Thumbnail } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import baseURL from '../../assets/common/baseURL'
import { CategoryFilter } from './CategoryFilter'
import { PostList } from '../Posts/PostList'

var { width, height } = Dimensions.get('window')
export const PostContainer = (props) => {
    // const for inputField 
    const [InputValue, SetInputValue] = useState('')
    const [Products, setProducts] = useState([]);
    // for onFocus and onBlur inside searchbar
    const [Focus, setFocus] = useState()
    //for categories 
    const [categories, setCategories] = useState([])
    // for products related to categories
    const [productCategories, setProductCategories] = useState([])
    // for active category we are selecting 
    const [activeCategory, setActiveCategory] = useState()
    // for initial category which select all categories 
    const [initialCategory, setInitialCategory] = useState([])
    // for laoder 
    const [loading, setLoading] = useState(true)
    useFocusEffect((
        useCallback(
            () => {
                // callback
                setFocus(false)
                setActiveCategory(-1)
                fetch(`${baseURL}posts`, { method: 'GET' })
                    .then(response => response.json())
                    .then(json => {
                        setProducts(json)
                        setProductCategories(json)
                        setInitialCategory(json)
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error, 'API ERROR for post container')
                    })
                fetch(`${baseURL}categories`, { method: 'GET' })
                    .then(response => response.json())
                    .then(json => {
                        setCategories(json)
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error, 'API ERROR for categories')
                    })

                return () => {
                    setProducts([])
                    setFocus()
                    setCategories([])
                    setActiveCategory()
                    setInitialCategory([])
                }
            },
            [],
        )
    ))

    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });


    // Categories
    const changeCategory = (ctg) => {
        {
            ctg === "All"
                ? [setProductCategories(initialCategory), setActiveCategory(true)]
                : [
                    setProductCategories(
                        Products.filter((i) => i.categoryID === ctg),
                        setActiveCategory(true),
                    )
                ];
        }
    };

    if (!fontsLoaded) {
        return <AppLoading size={30} color="red" />;
    }
    else {
        return (
            loading === false ? (
                <>
                    <ScrollView contentContainerStyle={styles.mainContainer}>
                        <CategoryFilter
                            categories={categories}
                            categoryFilter={changeCategory}
                            productCategories={productCategories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                        {productCategories.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productCategories.map((item) => {
                                    return (
                                        <PostList
                                            navigation={props.navigation}
                                            key={item.id}
                                            item={item}
                                        />
                                    )
                                })}
                            </View>

                        ) : (
                            <View style={styles.searchWrap}>
                                <View>
                                    <Image source={require('../../assets/noposts.png')}
                                        style={{ width: width / 2 + 90, height: height / 2 }}
                                        resizeMode='cover'
                                    />
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' }}>No Posts Found</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </>
            ) :
                (
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        < ActivityIndicator size='large' color='green' />
                    </View>
                )
        )
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff'
    },
    formContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 0,
        paddingHorizontal: 25,
        color: "#fff",
        paddingVertical: 10,
    },
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})

