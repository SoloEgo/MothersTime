import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { View, Text } from 'react-native';
import './config';
import { Platform, NativeModules } from 'react-native'
import SetUp from './screens/setUp';
import SignIn from './screens/signIn';
import SignUp from './screens/singUp';
import Home from './screens/home';

export default function App() {

  const getLanguage = async () => {
    let language = global.config.language
    if(!language){
      const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
      const locale = deviceLanguage.substring(0,2);
      global.config.language = locale
    }
  }

  getLanguage()

  const Stack = createNativeStackNavigator();
  return (
    <RootSiblingParent> 
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Home' component={Home} options={{ headerShow: false }} />
          <Stack.Screen name='SetUp' component={SetUp} options={{ headerShow: false }} />
          <Stack.Screen name='SignIn' component={SignIn} options={{ headerShow: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShow: false }} />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </RootSiblingParent>
  );
}