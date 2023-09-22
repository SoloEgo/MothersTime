import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/styles'
import { mainStyles } from '../assets/styles/mainStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import validator from 'validator';
import { Icon } from 'react-native-elements'
import { lnObj } from '../constants/language';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';

export default function PasswordReset({ navigation }) {
    const [email, setEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const language = useSelector((state) => {
        return state.records.locale
    });


    useEffect(() => {
        if (validator.isEmail(email)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email])

    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email, null).then((userCredential) => {
            storeData(userCredential.user.uid);
        }).catch((error) => {
            console.log(error.code)
            if (error.code == 'auth/user-not-found') {
                Toast.show('User not fond', {
                    duration: Toast.durations.LONG,
                    position: 50,
                });
            }
        })
    }

    const storeData = async (userIdVal, childName, childPhoto) => {
        moveNext()
    }

    const moveNext = () => {
        navigation.navigate('Home')
    }

    const moveSignUp = () => {
        navigation.navigate('SignUp')
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
                            <View style={styles.row}><Text style={styles.h1}>{lnObj.resetPasswordHeader[language]}</Text><Text style={styles.hiEmoji}>🔑</Text></View>
                            <Text style={styles.h3}>{lnObj.resetPasswordH3[language]}</Text>
                        </View>
                        {resetSuccess ? ''
                            :
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
                                <TouchableOpacity style={[styles.confirmButton, isDisabled ? styles.disabledConfirmButton : '']} onPress={resetPassword} disabled={isDisabled} >
                                    <Text style={styles.confirmButtonText}>{lnObj.resetPasswordButton[language]}</Text>
                                </TouchableOpacity>
                                <View style={[styles.haveAccountRow, mainStyles.row]}>
                                    <Text style={styles.haveAccountText}>{lnObj.haveNotAccount[language]}</Text>
                                    <Pressable style={styles.clearBtn} onPress={moveSignUp} ><Text style={styles.clearBtnText}>{lnObj.signUpBtn[language]}</Text></Pressable>
                                </View>
                            </View>
                        }

                    </View>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    );
}