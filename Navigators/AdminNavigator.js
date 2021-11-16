import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PostAdmin } from "../screens/Admin/PostAdmin";
import { AdminPanel } from "../screens/Admin/AdminPanel"
import { SinglePost } from "../screens/Posts/SinglePost";
import { AllUsers } from "../screens/Admin/AllUsers";
import { AllLostPosts } from '../screens/Admin/AllLostPosts'
import { AllFoundPosts } from '../screens/Admin/AllFoundPosts'
import { AllCategories } from '../screens/Admin/AllCategories'
import { AllLocations } from "../screens/Admin/AllLocations";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin Panel"
        component={AdminPanel}
        options={{
          headerShown: true,
          title: 'Admin Panel',
        }}
      />
      <Stack.Screen
        name="post"
        component={PostAdmin}
        options={{
          headerShown: true,
          title: 'Admin Panel',
        }}
      />

      <Stack.Screen
        name="Lost Posts"
        component={AllLostPosts}
        options={{
          headerShown: true,
          title: 'All Lost Posts',
        }}
      />

      <Stack.Screen
        name="Found Posts"
        component={AllFoundPosts}
        options={{
          headerShown: true,
          title: 'All Found Posts',
        }}
      />


      <Stack.Screen
        name="All Users"
        component={AllUsers}
        options={{
          headerShown: true,
          title: 'Our Users',
        }}
      />

      <Stack.Screen
        name="All Categories"
        component={AllCategories}
        options={{
          headerShown: true,
          title: 'Our Categories',
        }}
      />

      <Stack.Screen
        name="All Locations"
        component={AllLocations}
        options={{
          headerShown: true,
          title: 'Our Locations',
        }}
      />

      <Stack.Screen
        name="Post Details"
        component={SinglePost}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
