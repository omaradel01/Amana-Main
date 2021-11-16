import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import {
    LineChart, BarChart, PieChart, ProgressChart, ContributionGraph
} from 'react-native-chart-kit'
import { useFocusEffect } from "@react-navigation/native";
const screenWidth = Dimensions.get('window').width

export const UserBarChart = (props) => {
    const { userCat } = props
    const [userLoss, getUserLoss] = useState([])
    const [userCategory, getUserCategory] = useState([])
    if (userCat === null || userCat === undefined) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                < ActivityIndicator size='large' color='green' />
            </View>
        )
    }
    else {
        userCat.map((item) => {
            userLoss.push(item.num)
            item.Category.map(x => {
                userCategory.unshift(x.name)
            })
        })
        console.log(userCategory, "-------------", userLoss)
        const data = {
            labels: userCategory,
            datasets: [{
                data: userLoss
            }]
        }
        return (
            <View style={{ marginVertical: 25 }}>
                <BarChart
                    yLabelsOffset={3}
                    yAxisSuffix={' item'}
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        stackedBar: true,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0,0,0,1)`,
                        style: {
                            borderRadius: 16,
                            fontSize: 15
                        }
                    }} />
            </View>
        )
    }

}