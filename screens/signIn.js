import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/styles'
import { mainStyles } from '../assets/styles/mainStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import validator from 'validator';
import { Icon } from 'react-native-elements'
import { emailKey, setUpDone, isNew, userId } from '../constants/constants';
import { lnObj } from '../constants/language';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const CODE_LENGTH = 6;

  const language = useSelector((state) => {
    return state.records.locale
  });

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      console.log(e.data.action.type)
      if(e.data.action.type == 'GO_BACK'){
        console.log('stop')
        e.preventDefault();
      }else{
        console.log('move')
        navigation.dispatch(e.data.action)
      }
    });
  }, [navigation]);


  useEffect(() => {
    if (validator.isEmail(email) && password.length >= CODE_LENGTH) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password])

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      storeData(userCredential.user.uid);
    }).catch((error) => {
      console.log(error.code)
      if (error.code == 'auth/user-not-found') {
        Toast.show('User not fond', {
          duration: Toast.durations.LONG,
          position: 50,
        });
      }
      if (error.code == 'auth/wrong-password') {
        Toast.show(lnObj.passwordIncorrect[language], {
          duration: Toast.durations.LONG,
          position: 50,
        });
      }
    })
  }

  const storeData = async (userIdVal, childName, childPhoto) => {
    await AsyncStorage.multiSet([[emailKey, email], [isNew, 'false'], [setUpDone, 'false'], [userId, userIdVal]]).then(() => {
      moveNext()
    }).catch((error) => { console.error(error) })
  }

  const moveNext = () => {
    navigation.navigate('Home')
  }

  const moveSignUp = () => {
    navigation.navigate('SignUp')
  }
  const moveResetPassword = () => {
    navigation.navigate('PasswordReset')
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <View style={styles.wrapper}>

        <LinearGradient
          colors={['#FF5995', '#5379FF']}
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
              <View style={styles.row}><Text style={styles.h1}>{lnObj.welcomeBack[language]}</Text><Text style={styles.hiEmoji}>👋</Text></View>
              <Text style={styles.h3}>{lnObj.welcomBackTextH3[language]}</Text>
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
              <View style={[mainStyles.textInputWrapper, { marginBottom: 0 }]}>
                <Icon
                  name='lock-closed-outline'
                  type='ionicon'
                  color='#d3d3d3'
                  style={styles.signUpFormIcon}
                />
                <TextInput
                  style={mainStyles.textInput}
                  value={password}
                  textContentType='password'
                  secureTextEntry={true}
                  onChangeText={(value) => { setPassword(value) }}
                  placeholder={lnObj.password[language]}
                  placeholderTextColor="#d3d3d3"
                ></TextInput>
              </View>
              <View style={[mainStyles.row, { marginBottom: 20 }]}>
                <View><Text style={styles.haveAccountText}>{lnObj.foregetPassword[language]}</Text></View>
                <TouchableOpacity style={styles.clearBtn} onPress={moveResetPassword}><Text style={styles.clearBtnText}>{lnObj.resetPasswordButton[language]}</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.confirmButton, isDisabled ? styles.disabledConfirmButton : '']} onPress={signIn} disabled={isDisabled} >
                <Text style={styles.confirmButtonText}>{lnObj.signIn[language]}</Text>
              </TouchableOpacity>
              <View style={[styles.haveAccountRow, mainStyles.row]}>
                <Text style={styles.haveAccountText}>{lnObj.haveNotAccount[language]}</Text>
                <TouchableOpacity style={styles.clearBtn} onPress={moveSignUp} ><Text style={styles.clearBtnText}>{lnObj.signUpBtn[language]}</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}