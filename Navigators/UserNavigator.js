import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { SignUp } from "../screens/SignUp";
import { Login } from "../screens/login";
import { EditAccount } from '../screens/User/EditAccount'
import { UserProfile } from '../screens/User/UserProfile'
import { ForgetPassword } from '../screens/User/ForgetPassword'
import { ChangePassword } from '../screens/User/ChangePassword'
import { UserDashboard } from '../screens/User/UserDashboard'
import AuthGlobal from "../Context/Store/AuthGlobal";
const Stack = createStackNavigator()
function MyStack() {
    const context = useContext(AuthGlobal);
    return (
        <Stack.Navigator>
            {context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null ?
                (
                    <>
                        <Stack.Screen
                            name='Login'
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </>
                ) :
                (
                    <Stack.Screen
                        name='User Profile'
                        component={UserProfile}
                        options={{
                            headerShown: false,
                            headerTitle: false
                        }}
                    />
                )
            }
            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Edit Account'
                component={EditAccount}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='User Dashboard'
                component={UserDashboard}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
            <Stack.Screen
                name='Forget Password'
                component={ForgetPassword}
                options={{
                    headerShown: true,
                    headerTitle: true,
                    title: 'Reset Password'
                }}
            />
            <Stack.Screen
                name='Change Password'
                component={ChangePassword}
                options={{
                    headerShown: true,
                    headerTitle: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}