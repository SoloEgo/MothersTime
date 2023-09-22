import { useEffect, useState, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, Alert, TextInput, ActionSheetIOS, Platform, Button } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { settingsStyles } from '../assets/styles/settings';
import CheckBox from '../components/checkBox';
import BottomSheetSchedule from '../components/bottomSheetSchedule';
import ScheduleItem from '../components/scheduleItem';
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { activeNameStored, activePhoto, userId, setUpDone, notificationsStatus } from '../constants/constants';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadSchedules, addChild, setBottomSheetVisible, editChild, setActiveChild, loadChild } from '../store/actions/records';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { themeStyles } from '../assets/styles/themeStyles';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export default function Settings({ navigation }) {
    //const [activeChild, setActiveChild] = useState([])
    const [addNewChildState, setAddNewChildState] = useState(false)
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [gender, setGender] = useState('male');
    const [childName, setChildName] = useState('')
    const [dateOfBirth, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [childId, setSChildId] = useState(1)
    const [activeType, setActiveType] = useState('feeding')
    const [activeName, setActiveName] = useState()
    const [activeTime, setActiveTime] = useState()
    const [activeScheduleId, setActiveScheduleId] = useState()
    const [isActiveButton, setIsActiveButton] = useState(false)
    const [changeType, setChangeType] = useState('add')
    const [iosKeyboardPosition, setIosKeyboardPosition] = useState('padding');
    const [isChecked, setChecked] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false)

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const dispatch = useDispatch();

    const getAsyncData = async () => {
        const values = await AsyncStorage.multiGet([setUpDone]);
        if (values[0][1] == 'true') {
            setShowLogOut(true)
        } else {
            setShowLogOut(false)
        }
    }

    useEffect(() => {

        dispatch(loadChild(userId))

        getAsyncData()

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        checkNotificationsStatus();

        return () => {
            //console.log('remove all notifications')
            //Notifications.removeNotificationSubscription(notificationListener.current);
            //Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const checkNotificationsStatus = async () => {
        try {
            const values = await AsyncStorage.multiGet([notificationsStatus, setUpDone]);
            if (values[1][1] == 'true') {
                setChecked(values[0][1] == 'true' ? true : false)
            } else {
                setChecked(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function schedulePushNotification() {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        Notifications.cancelAllScheduledNotificationsAsync()

        await AsyncStorage.multiSet([[notificationsStatus, isChecked ? 'true' : 'false']]).then(() => {

        }).catch((error) => { console.error(error) })

        if (isChecked) {
            for (let i = 0; i < schedule.length; i++) {
                let triggerSc
                let hours = new Date(schedule[i].time).getHours()
                let minutes = new Date(schedule[i].time).getMinutes()
                console.log('create notification')
                Platform.OS === 'android' ? triggerSc = { hour: hours, minute: minutes, repeats: true, } : triggerSc = { type: 'daily', hour: hours, minute: minutes }
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Пришло время ${schedule[i].type == 'feeding' ? 'есть' : 'спать'}!`,
                        body: `Подходит время для ${schedule[i].name}`,
                        data: { data: 'goes here' },
                    },
                    trigger: triggerSc
                });
            }
        }

    }

    async function requestPermissionsAsync() {
        return await Notifications.requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
                allowAnnouncements: true,
            }
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        let as = await requestPermissionsAsync()

        if (Platform.OS === 'android') {
            console.log('set notification')
            await Notifications.setNotificationChannelAsync('motherstime', {
                name: 'motherstime',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                console.log('ask perm notification')
                const { status } = await Notifications.requestPermissionsAsync();
                console.log({ status })
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log('token=>');
            console.log(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        return token;
    }

    const language = useSelector((state) => {
        return state.records.locale
    });

    const userId = useSelector((state) => {
        return state.records.userId
    })

    const child = useSelector((state) => {
        return state.records.activeChild
    })

    useEffect(() => {
        if (child.length > 0) {
            setActiveChild(child)
            setChildName(child[0].name)
            setDate(new Date(child[0].dob))
            setGender(child[0].gender)
            setPickedImagePath(child[0].photo)
        }
    }, [child])

    useEffect(() => {
        if (child.length > 0) {
            dispatch(loadSchedules(userId, childId));
        }
    }, [dispatch, userId]);

    const schedule = useSelector((state) => {
        return state.records.allSchedules
    });

    useEffect(() => {
        let f = schedule.filter(item => item.type == 'feeding').length
        let s = schedule.filter(item => item.type == 'sleep').length
        if (childName.length >= 2 && f >= 1 && s >= 1) {
            setIsActiveButton(true)
        } else {
            setIsActiveButton(false)
        }
    }, [childName, schedule])

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setMode(currentMode);
    };

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', lnObj.male[language], lnObj.female[language]],
                //destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    setGender('male');
                } else if (buttonIndex === 2) {
                    setGender('female');
                }
            },
        );
    }

    const showPhotoAlert = () => {
        Alert.alert(
            'Photo',
            'Take a photo or choose one from gallery',
            [
                {
                    text: 'Photo', onPress: () => {
                        openCamera()
                    }
                },
                { text: 'Gallery', onPress: () => { pickImage() } },
            ],
            { cancelable: true }
        );
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.3,
            base64: true
        });
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].base64);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.3,
            base64: true
        });
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].base64);
        }
    };

    const saveChild = async () => {
        if (!isActiveButton) {
            return
        }

        if (child.length > 0) {
            console.log('editting child')
            const childRecord = {
                userId: userId,
                childrenID: childId,
                name: childName,
                dob: Moment(dateOfBirth).format("YYYY-MM-DD"),
                gender: gender,
                photo: pickedImagePath,
            }

            try {
                dispatch(editChild(childRecord));
                await AsyncStorage.multiSet([[setUpDone, 'true']])
                moveHome()
            } catch (error) {
                console.log('error settings try catch child length > 0')
                console.log(error)
            }
        } else {
            console.log('createing sch')
            await AsyncStorage.multiSet([[setUpDone, 'true']]).then(async () => {
                const childRecordAdd = {
                    userId: userId,
                    name: childName,
                    dob: Moment(dateOfBirth).format("YYYY-MM-DD"),
                    gender: gender,
                    photo: pickedImagePath
                }
                try {
                    console.log(childRecordAdd)
                    dispatch(addChild(childRecordAdd));
                    dispatch(setActiveChild({ userId: userId }));
                    moveHome()
                } catch (error) {
                    console.log('error settings try catch child length < 0')
                    console.log('error')
                    console.log(error)
                }

            }).catch((error) => { console.error(error) })
        }
    }

    const moveHome = () => {
        navigation.push('Home')
    }

    const moveToSignIn = () => {
        navigation.push('SignIn')
    }

    const logut = async () => {
        try {
            await auth.signOut().then(async () => {
                await AsyncStorage.clear()
                moveToSignIn()
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const setIsVisible = async (visibility) => {
        dispatch(setBottomSheetVisible(visibility))
    }

    const editSchedule = async (scheduleId, name, time, type) => {
        setActiveType(type)
        setActiveName(name)
        setActiveTime(time)
        setActiveScheduleId(scheduleId)
        setChangeType('edit')
        dispatch(setBottomSheetVisible(true))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? iosKeyboardPosition : ''}>
            <SafeAreaView style={[setUpStyles.wrapper, themeStyles.backgroundColor]}>
                <View style={[setUpStyles.container, themeStyles.backgroundColor]}>
                    <ScrollView style={setUpStyles.scrollViewMain}>
                        <View style={[mainStyles.header, mainStyles.row]}>
                            <Text style={[mainStyles.h1, mainStyles.text]}>{lnObj.settings[language]}</Text>
                            {showLogOut ?
                                <View style={[setUpStyles.setUpBlock, { position: 'absolute', right: 0 }]}>
                                    <View style={setUpStyles.setUpHeader}>
                                        <View style={setUpStyles.row}>
                                            <TouchableOpacity onPress={() => { logut() }} style={mainStyles.mainButtonLogout}>
                                                <Icon
                                                    name='log-out-outline'
                                                    type='ionicon'
                                                    color='#E53935'
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View> : ''}
                        </View>
                        <View style={setUpStyles.childFormHolder}>
                            <View style={setUpStyles.childFormMainInfo}>

                                <View style={setUpStyles.imageContainer}>
                                    {!pickedImagePath.length <= 0 ?
                                        <TouchableOpacity style={setUpStyles.imageContainerChanger} onPress={showPhotoAlert}>
                                            <Image style={setUpStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + pickedImagePath }} />
                                            <View style={setUpStyles.childPhotoIconChange}>
                                                <Icon
                                                    name='camera-outline'
                                                    type='ionicon'
                                                    color='#fff'
                                                    size={20}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={setUpStyles.childPhotoIconBlock} onPress={showPhotoAlert}>
                                            <Icon
                                                name='camera-outline'
                                                type='ionicon'
                                                color='#d3d3d3'
                                                size={30}
                                            />
                                            <Text style={[mainStyles.text, mainStyles.t_center, mainStyles.p]}>{lnObj.addPhoto[language]}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={setUpStyles.childFormInputsBlock}>
                                    <View style={setUpStyles.childFormInputsLabel}>
                                        <Text style={[setUpStyles.childFormInputsLabelText, mainStyles.text]}>{lnObj.childsName[language]}</Text>
                                    </View>
                                    <View style={[setUpStyles.textInWrap, themeStyles.backgroundColorLightDark]}>
                                        <TextInput
                                            style={[mainStyles.textInput, mainStyles.text]}
                                            value={childName}
                                            onFocus={() => {
                                                setIosKeyboardPosition('padding')

                                            }}
                                            onChangeText={(value) => { setChildName(value) }}
                                        ></TextInput>
                                    </View>
                                </View>
                                <View style={setUpStyles.childFormInputsRow}>
                                    <View style={setUpStyles.childFormInputsBlock_2}>
                                        <View style={setUpStyles.childFormInputsLabel}>
                                            <Text style={[setUpStyles.childFormInputsLabelText, mainStyles.text]}>{lnObj.childsBirthDate[language]}</Text>
                                        </View>
                                        {Platform.OS === 'android' ?
                                            <View style={[setUpStyles.textInWrap, mainStyles.textInputWrapper]}>
                                                <View>
                                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => { setShow(true); }}><Text style={mainStyles.textInput}>{Moment(dateOfBirth).format('DD.MM.yyyy')}</Text></TouchableOpacity>
                                                    {show && (
                                                        <DateTimePicker
                                                            testID="dateTimePickerTest"
                                                            value={dateOfBirth}
                                                            mode={'date'}
                                                            onChange={onChangeDate}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                            :
                                            <View style={setUpStyles.iosDateInput}>
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateOfBirth}
                                                    mode={mode}
                                                    locale={language == 'ru' ? "ru-RU" : "en-EN"}
                                                    is24Hour={true}
                                                    onChange={onChangeDate}
                                                />
                                            </View>
                                        }
                                    </View>
                                    <View style={setUpStyles.childFormInputsBlock_2}>
                                        <View style={setUpStyles.childFormInputsLabel}>
                                            <Text style={[mainStyles.text, setUpStyles.childFormInputsLabelText]}>{lnObj.childsGender[language]}</Text>
                                        </View>
                                        {Platform.OS === 'android' ?
                                            <View style={[mainStyles.textSelectWrapper]}>
                                                <Picker
                                                    selectedValue={gender}
                                                    style={{ height: 47, marginTop: -7 }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setGender(itemValue)
                                                    }>
                                                    <Picker.Item label={lnObj.male[language]} value="male" />
                                                    <Picker.Item label={lnObj.female[language]} value="female" />
                                                </Picker>
                                            </View>
                                            :
                                            <TouchableOpacity onPress={showActionSheet} style={[setUpStyles.genderPresSheet, themeStyles.backgroundColorLightDark]}>
                                                <Text style={[setUpStyles.genderPresSheetText, mainStyles.text]}>{gender == 'male' ? lnObj.male[language] : lnObj.female[language]}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={[setUpStyles.setUpBlockWrapper, themeStyles.backgroundColorDark]}>
                                <View style={[ setUpStyles.setUpBlockWrapperHeader]}><Text style={[mainStyles.text, setUpStyles.setUpBlockWrapperHeaderText]}>Желаемый распорядок дня</Text></View>
                                <View style={setUpStyles.scheduleBlock}>
                                    <View style={setUpStyles.setUpBlock}>
                                        <View style={setUpStyles.setUpHeader}>
                                            <View style={setUpStyles.row}>
                                                <Text style={[setUpStyles.setUpHeaderText, mainStyles.text]}>{lnObj.feeding[language]}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setIsVisible(true)
                                                    setChangeType('add')
                                                    setActiveType('feeding')
                                                    setIosKeyboardPosition('position')
                                                }} style={mainStyles.mainPlusBtn}>
                                                    <Icon
                                                        name='add-outline'
                                                        type='ionicon'
                                                        color='#fff'
                                                        size={20}
                                                        style={setUpStyles.signUpFormIcon}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={setUpStyles.setUpContentWrapper}>
                                            <ScrollView style={setUpStyles.setUpContentSlider}
                                                horizontal={true}
                                                decelerationRate='fast'
                                                centerContent={true}
                                                showsHorizontalScrollIndicator={false}
                                                pagingEnabled='true'
                                                contentContainerStyle={{
                                                    flexGrow: 1,
                                                    alignContent: 'center',
                                                    alignItems: 'flex-start',
                                                    padding: 10,
                                                }}
                                            >
                                                {[
                                                    schedule.filter(item => item.type == "feeding").map((element, i) => {
                                                        return (
                                                            <TouchableOpacity key={element.scheduleId}
                                                                onPress={() => {
                                                                    editSchedule(element.scheduleId, element.name, element.time, 'feeding')
                                                                    setIosKeyboardPosition('position')
                                                                }}>
                                                                <ScheduleItem time={element.time} scheduleId={element.scheduleId} name={element.name} type="feeding" />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                ]}
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <View style={setUpStyles.setUpBlock}>
                                        <View style={setUpStyles.setUpHeader}>
                                            <View style={setUpStyles.row}>
                                                <Text style={[setUpStyles.setUpHeaderText, mainStyles.text]}>{lnObj.sleep[language]}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setIsVisible(true)
                                                    setActiveType('sleep')
                                                    setChangeType('add')
                                                    setIosKeyboardPosition('position')
                                                }} style={mainStyles.mainPlusBtn}>
                                                    <Icon
                                                        name='add-outline'
                                                        type='ionicon'
                                                        color='#fff'
                                                        size={20}
                                                        style={setUpStyles.signUpFormIcon}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={setUpStyles.setUpContentWrapper}>
                                            <ScrollView style={setUpStyles.setUpContentSlider}
                                                horizontal={true}
                                                decelerationRate='fast'
                                                centerContent={false}
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={{
                                                    flexGrow: 1,
                                                    alignContent: 'center',
                                                    alignItems: 'flex-start',
                                                    padding: 10,
                                                }}
                                            >
                                                {[
                                                    schedule.filter(item => item.type == "sleep").map((element, i) => {
                                                        return (
                                                            <TouchableOpacity key={element.scheduleId} onPress={() => {
                                                                editSchedule(element.scheduleId, element.name, element.time, 'sleep')
                                                                setIosKeyboardPosition('position')
                                                            }}>
                                                                <ScheduleItem time={element.time} scheduleId={element.scheduleId} name={element.name} type="sleep" />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                ]}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={setUpStyles.setUpBlock}>
                            <View style={setUpStyles.setUpHeader}>
                                <View style={setUpStyles.row}>
                                    <Text style={[setUpStyles.setUpHeaderText, mainStyles.text]}>{lnObj.turnOnNotifications[language]}</Text>
                                    <TouchableOpacity onPress={() => { setChecked(!isChecked) }}>
                                        <CheckBox
                                            isChecked={isChecked}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                    <View style={[setUpStyles.childFormConfirm, themeStyles.backgroundColor]}>
                        <TouchableOpacity style={[mainStyles.mainButton, !isActiveButton ? mainStyles.disabledMainButton : '']} onPress={() => {
                            saveChild()
                            schedulePushNotification()
                        }}><Text style={[mainStyles.text, mainStyles.t_center, mainStyles.h4, mainStyles.textWhite]}>{lnObj.saveBtn[language]}</Text></TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            <BottomSheetSchedule activeType={activeType} childId={childId} userIdStored={userId} activeTime={activeTime} activeName={activeName} activeScheduleId={activeScheduleId} type={changeType} />

        </KeyboardAvoidingView>
    );
}