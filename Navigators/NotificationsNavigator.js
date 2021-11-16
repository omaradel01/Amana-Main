import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NotificationItems } from '../screens/Notification/NotificationItems'
import { SinglePost } from '../screens/Posts/SinglePost'
const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Notification'
                component={NotificationItems}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Post Details'
                component={SinglePost}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}