import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { PostController } from '../screens/PostMain/PostController'
import { AddNewPost } from '../screens/PostMain/AddNewPost'
import { EditPost } from '../screens/PostMain/EditPost'
import { DeletePosts } from '../screens/PostMain/DeletePosts'
import { ViewAllPosts } from '../screens/PostMain/ViewAllPosts'
import { SinglePost } from '../screens/Posts/SinglePost'
import { MatchingPost } from '../screens/Posts/MatchingPost'
const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='post'
                component={PostController}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Add'
                component={AddNewPost}
                options={{
                    headerShown: true,
                    title: 'Add Posts'
                }}
            />
            <Stack.Screen
                name='Edit'
                component={EditPost}
                options={{
                    headerShown: true,
                    title: 'Edit Posts'

                }}
            />
            <Stack.Screen
                name='Delete'
                component={DeletePosts}
                options={{
                    headerShown: true,
                    title: 'Delete Posts'
                }}
            />
            <Stack.Screen
                name='View'
                component={ViewAllPosts}
                options={{
                    headerShown: true,
                    title: 'My Posts'

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
            <Stack.Screen
                name='Post Details'
                component={SinglePost}
                options={{
                    headerShown: true,
                    title: 'Post Details'

                }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}