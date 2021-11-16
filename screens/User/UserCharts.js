import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import {
    LineChart, BarChart, PieChart, ProgressChart, ContributionGraph
} from 'react-native-chart-kit'
import { useFocusEffect } from "@react-navigation/native";
const screenWidth = Dimensions.get('window').width

export const UserCharts = (props) => {
    const { userLoc } = props

    if (userLoc === null || userLoc === undefined) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                < ActivityIndicator size='large' color='green' />
            </View>
        )
    }
    else {
        const [userLost, getUserLost] = useState(userLoc[0].avgLost)
        const [userFound, getUserFound] = useState(userLoc[0].avgFound)

        const dataForPie = [
            { name: 'Found', population: userFound, color: '#52b788', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Lost', population: userLost, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ]

        return (
            <View>

                <PieChart
                    data={dataForPie}
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
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />

            </View>
        )
    }
}





