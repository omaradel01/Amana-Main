import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, ActivityIndicator } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export const CategoryFilter = (props) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    // load fonts 
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        return (
            <ScrollView
                bounces={true}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
            >
                <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                    <TouchableOpacity
                        key={1}
                        style={[styles.center, { margin: 5 },
                        props.activeCategory === -1 ? styles.active : styles.inactive
                        ]}
                        onPress={() => {
                            props.categoryFilter('All'), props.setActiveCategory(-1)
                        }}
                    >
                        <Icon type="FontAwesome" name='star' style={{ color: 'white' }} />
                        <Text style={{ color: 'white', margin: 5, fontFamily: 'Poppins-Med' }}>All</Text>

                    </TouchableOpacity>
                    {props.categories.map((item) => (
                        <TouchableOpacity
                            style={[styles.center,
                            { margin: 5 },
                            props.activeCategory == props.categories.indexOf(item) ? styles.active : styles.inactive
                            ]}
                            key={item._id}
                            onPress={() => {
                                props.categoryFilter(item._id), props.setActiveCategory(props.categories.indexOf(item))
                            }}
                        >
                            <Icon type="Ionicons" name={item.icon} style={{ color: 'white' }} />
                            <Text style={{ color: 'white', margin: 5, fontFamily: 'Poppins-Med' }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ListItem>
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    center: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 10

    },
    active: {
        backgroundColor: '#40916c'
    },
    inactive: {
        backgroundColor: '#74c69d'
    }
})