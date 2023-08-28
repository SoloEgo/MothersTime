import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider, useDispatch } from 'react-redux';
import './config';
import SetUp from './screens/setUp';
import SignIn from './screens/signIn';
import SignUp from './screens/singUp';
import Home from './screens/home';
import Settings from './screens/settings';
import store from './store';
import { bootstrap } from './components/bootsrap';
import { Text, View } from 'react-native';
import Main from './screens/main';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name='Home' component={Home} options={{ headerShow: false }} />
              <Stack.Screen name='Main' component={Main} options={{ headerShow: false }} />
              <Stack.Screen name='SetUp' component={SetUp} options={{ headerShow: false }} />
              <Stack.Screen name='SignIn' component={SignIn} options={{ headerShow: false }} />
              <Stack.Screen name='SignUp' component={SignUp} options={{ headerShow: false }} />
              <Stack.Screen name='Settings' component={Settings} options={{ headerShow: false }} />
            </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}