import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import { emailKey, isNew, setUpDone } from '../constants/constants';
import { styles } from "../assets/styles/styles";
import SignUp from './singUp';
import SetUp from './setUp';
import { Text, View } from 'react-native';
import useFonts from '../assets/styles/useFonts';

export default function Home({navigation}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [setupDone, setSetupDone] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false);
  
  useEffect(() => {
    //AsyncStorage.clear();
    async function loadFont() {
      await useFonts();
      setFontLoaded(true);
    }
    
    if(!fontLoaded){
      loadFont()
    }
    
    
    retrieveData();
  }, [])

  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.multiGet([emailKey, setUpDone, isNew]);
      if (values[2][1] == 'true' || !values[2][1]) {
        setIsSignUp(true)
      }
      if (values[1][1] == 'true' && !values[1][1]) {
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
    <View style={styles.mainContainer}>
      {isSignUp ? <SignUp navigation={navigation} /> :
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