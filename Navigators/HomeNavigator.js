import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { PostContainer } from "../screens/Posts/PostContainer";
import { SinglePost } from "../screens/Posts/SinglePost"
import { AddComment } from "../screens/Posts/AddComment"
import { MatchingPost } from '../screens/Posts/MatchingPost'

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={PostContainer}
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
            <Stack.Screen
                name='Add Comment'
                component={AddComment}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='Matching Post'
                component={MatchingPost}
                options={{
                    headerShown: true,
                    title: 'The Matching Post'

                }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}