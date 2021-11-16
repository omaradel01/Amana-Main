import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator();
import { Main } from './Navigators/Main'
import { LogBox } from "react-native";
import { Header } from './Shared/Header'
// import onBoarding from './screens/onboarding'
// import Login from './screens/login'
// import welcome from './screens/welcome'
// import SignUp from './screens/SignUp';
import Toast from 'react-native-toast-message'
import { Text } from 'native-base';
import * as Font from 'expo-font';
import { useEffect } from 'react';

// context API
import Auth from './Context/Store/Auth'
LogBox.ignoreAllLogs(true);
export default function App() {
  useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
    }))();
  }, [])
  return (
    <Auth>
      <NavigationContainer>
        <Header />
        <Main />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        {/* <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="welcome" component={welcome}></AppStack.Screen>
        <AppStack.Screen name="onBoarding" component={onBoarding}></AppStack.Screen>
        <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
        <AppStack.Screen name="SignUp" component={SignUp}></AppStack.Screen>
      </AppStack.Navigator> */}
      </NavigationContainer >
    </Auth>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
