import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { styles } from '../assets/styles/styles'
import { mainStyles } from '../assets/styles/mainStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import LogoComponent from '../assets/logo';
import validator from 'validator';
import { Icon } from 'react-native-elements'
import { emailKey, setUpDone, isNew, userId } from '../constants/constants';
import { lnObj } from '../constants/language';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const CODE_LENGTH = 6;

  const language = useSelector((state) => {
    return state.records.locale
  });

  useEffect(() => {
    if (validator.isEmail(email) && password.length >= CODE_LENGTH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password])

  const createAccount = async () => {
    await createUserWithEmailAndPassword(auth, email, password).then((result) => {
      storeData(result.user.uid);
    }).catch((error) => {
      console.log(error)
      if (error.code == 'auth/email-already-in-use') {
        Toast.show('This e-mail is already used', {
          duration: Toast.durations.LONG,
          position: 50,
        });
      }
    })
  }

  const storeData = async (userIdVal) => {
    await AsyncStorage.multiSet([[emailKey, email], [isNew, 'false'], [setUpDone, 'false'], [userId, userIdVal]]).then(() => {
      moveNext()
    }).catch((error) => { console.error(error) })
  }

  const moveNext = () => {
    navigation.navigate('Home')
  }

  const moveSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <View style={styles.wrapper}>
        <LinearGradient
          colors={['#FF98BD', '#7AAFFF']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.container}
        >
          <ImageBackground source={
            require('../assets/Pattern.png')
          }
            resizeMode="repeat"
            style={styles.containerPattern}
          />
          <View style={styles.regBlock}>
            <View style={styles.signUpText}>
              <LogoComponent width="130" height="135" style={styles.logoImg} />
              <View style={styles.row}><Text style={styles.h1}>{lnObj.helloTextH1[language]}</Text><Text style={styles.hiEmoji}>👋</Text></View>
              <Text style={styles.h3}>{lnObj.helloTextH3[language]}</Text>
            </View>
            <View style={styles.signUpForm}>
              <View style={mainStyles.textInputWrapper}>
                <Icon
                  name='at-outline'
                  type='ionicon'
                  color='#d3d3d3'
                  style={styles.signUpFormIcon}
                />
                <TextInput
                  style={mainStyles.textInput}
                  value={email}
                  onChangeText={(value) => { setEmail(value) }}
                  placeholder="E-mail"
                  placeholderTextColor="#d3d3d3"
                  autoCapitalize="none"
                ></TextInput>
              </View>
              <View style={mainStyles.textInputWrapper}>
                <Icon
                  name='lock-closed-outline'
                  type='ionicon'
                  color='#d3d3d3'
                  style={styles.signUpFormIcon}
                />
                <TextInput
                  style={mainStyles.textInput}
                  value={password}
                  onChangeText={(value) => { setPassword(value) }}
                  placeholder={lnObj.password[language]}
                  placeholderTextColor="#d3d3d3"
                ></TextInput>
              </View>
              <Pressable style={[styles.confirmButton, isDisabled ? styles.disabledConfirmButton : '']} onPress={createAccount} disabled={isDisabled} >
                <Text style={styles.confirmButtonText}>{lnObj.signUp[language]}</Text>
              </Pressable>
              <View style={[styles.row, styles.haveAccountRow]}>
                <Text style={styles.haveAccountText}>{lnObj.haveAccount[language]}</Text>
                <Pressable style={styles.clearBtn} onPress={moveSignIn} ><Text style={styles.clearBtnText}>{lnObj.signInBtn[language]}</Text></Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}