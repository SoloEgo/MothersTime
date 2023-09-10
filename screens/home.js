import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from 'react';
import { emailKey, isNew, setUpDone, userId } from '../constants/constants';
import SignUp from './singUp';
import Main from "./main";
import { Text, View } from 'react-native';
import { mainStyles } from "../assets/styles/mainStyles";
import { useFocusEffect } from "@react-navigation/core";
// import * as SplashScreen from 'expo-splash-screen';
import { bootstrap } from '../components/bootsrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, loadChild, wipeData } from '../store/actions/records';
import Settings from "./settings";

//SplashScreen.preventAutoHideAsync();

export default function Home({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false)
  const [setupDone, setSetupDone] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        //await wipeDataAll(); // wipe all data and db
        await bootstrap();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [appIsReady]);

  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.multiGet([emailKey, setUpDone, isNew, userId]);
      if (values[0][1]) {
        setIsSignUp(true)
        dispatch(setUserId(values[3][1]))
        dispatch(loadChild(values[3][1]));
      }
      if (values[1][1] == 'true') {
        setSetupDone(true)
      }

    } catch (error) {
      console.error(error)
    }
  }

  const wipeDataAll = async () => {
    AsyncStorage.clear();
    dispatch(wipeData())
  }

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [])
  )

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      //await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
    <View style={mainStyles.preloaderView}>
      <Text>LOADING...</Text>
    </View>
    )
  }

  return (
    <View style={mainStyles.mainContainer} onLayout={onLayoutRootView}>
      {!isSignUp ? <SignUp navigation={navigation} /> :
        <>
          {!setupDone ?
            <Settings navigation={navigation} /> :
            <Main navigation={navigation} />
          }
        </>
      }
    </View>
  );
}