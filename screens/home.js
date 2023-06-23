import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { emailKey, isNew, setUpDone } from '../constants/constants';
import { styles } from "../assets/styles/styles";
import SignUp from './singUp';
import SetUp from './setUp';
import { Text, View } from 'react-native';
import useFonts from '../assets/styles/useFonts';
import { mainStyles } from "../assets/styles/mainStyles";
import { useFocusEffect } from "@react-navigation/core";

export default function Home({navigation}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [setupDone, setSetupDone] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    },[])
  )
  
  useEffect(() => {
    AsyncStorage.clear();
    async function loadFont() {
      await useFonts();
      setFontLoaded(true);
    }
    if(!fontLoaded){
      loadFont()
    }
  }, [])

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

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={mainStyles.mainContainer}>
      {!isSignUp ? <SignUp navigation={navigation} /> :
        <>
          {!setupDone ? <SetUp navigation={navigation}/> : 
          <View>
            <Text>Home</Text>
          </View>}
        </>
      }
    </View>
  );
}