import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from 'react';
import { emailKey, isNew, setUpDone } from '../constants/constants';
import SignUp from './singUp';
import SetUp from './setUp';
import Main from "./main";
import { Text, View } from 'react-native';
import { mainStyles } from "../assets/styles/mainStyles";
import { useFocusEffect } from "@react-navigation/core";
import * as SplashScreen from 'expo-splash-screen';
import { bootstrap } from '../components/bootsrap';

SplashScreen.preventAutoHideAsync();

export default function Home({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [setupDone, setSetupDone] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false);

  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.multiGet([emailKey, setUpDone, isNew]);
      if (values[0][1]) {
        setIsSignUp(true)
      }
      if (values[1][1] == 'true') {
        setSetupDone(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [])
  )

  useEffect(() => {
    //AsyncStorage.clear();
    async function prepare() {
      try {
        await bootstrap();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
    <View style={mainStyles.preloaderView}>
      <Text>LOADING</Text>
    </View>
    )
  }

  return (
    <View style={mainStyles.mainContainer} onLayout={onLayoutRootView}>
      {!isSignUp ? <SignUp navigation={navigation} /> :
        <>
          {!setupDone ?
            <SetUp navigation={navigation} /> :
            <Main navigation={navigation} />
          }
        </>
      }
    </View>
  );
}