import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Image, Alert, TextInput, ActionSheetIOS, Platform, Keyboard } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { settingsStyles } from '../assets/styles/settings';
import BottomSheetSchedule from '../components/bottomSheetSchedule';
import ScheduleItem from '../components/scheduleItem';
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { activeNameStored, activePhoto, userId, setUpDone } from '../constants/constants';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadSchedules, loadChildren, loadChild, addChild, setBottomSheetVisible } from '../store/actions/records';


export default function Settings({ navigation }) {
    const [activeChild, setActiveChild] = useState([])
    const [addNewChildState, setAddNewChildState] = useState(false)
    const [language, setLanguage] = useState('')
    const [userIdStored, setUserId] = useState('')
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
    const [iosKeyboardPosition, setIosKeyboardPosition] = useState('padding')

    const dispatch = useDispatch();

    const getStoreData = async () => {
        const values = await AsyncStorage.multiGet([userId]);
        setUserId(values[0][1])
    }

    useEffect(() => {
        setLocale()
        getStoreData()
    }, [])

    useEffect(() => {
        dispatch(loadChildren(userIdStored));
    }, [dispatch, userIdStored]);

    const children = useSelector((state) => {
        return state.records.allChildren
    });

    //console.log(children)

    useEffect(() => {
        if (children.length > 0) { dispatch(loadChild(userIdStored, children[0].childrenID)) };
    }, [dispatch, userIdStored]);

    const child = useSelector((state) => {
        return state.records.activeChild
    });

    useEffect(() => {
        setActiveChild(child)
        setChildName(child[0].name)
        setDate(new Date(child[0].dob))
        setGender(child[0].gender)
        setPickedImagePath(child[0].photo)
    }, [child])

    useEffect(() => {
        dispatch(loadSchedules(userIdStored, childId));
    }, [dispatch, userIdStored]);

    const schedule = useSelector((state) => {
        return state.records.allSchedules
    });

    const setLocale = async () => {
        let locale = global.config.language
        setLanguage(locale)
    }

    useEffect(() => {
        if (childName.length >= 2) {
            setIsActiveButton(true)
        }
    }, [childName])

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

    const showActionSheetActiveChild = () => {
        let childrenNames = [...new Set(children.map(item => item.name))]
        let optionsArray = ['Cancel', ...childrenNames, '+ add new child']
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: optionsArray,
                //destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === optionsArray.length - 1) {
                    console.log('add new child')
                } else {
                    console.log(children[buttonIndex - 1].name)
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

        console.log(permissionResult)

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

        const userIdVal = await AsyncStorage.getItem(userId)
        await AsyncStorage.multiSet([[activePhoto, pickedImagePath], [activeNameStored, childName], [setUpDone, 'true']]).then(async () => {
            const childRecord = {
                userId: userIdVal,
                name: childName,
                dob: Moment(dateOfBirth).format("YYYY-MM-DD"),
                gender: gender,
                photo: pickedImagePath
            }
            try {
                dispatch(addChild(childRecord));
                moveHome()
            } catch (error) {
                console.log('error')
            }

        }).catch((error) => { console.error(error) })
    }

    const moveHome = () => {
        navigation.push('Home')
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? iosKeyboardPosition : 'height'}>
            <SafeAreaView style={setUpStyles.wrapper}>
                <View style={setUpStyles.container}>
                    <ScrollView style={setUpStyles.scrollViewMain}>
                        <View style={mainStyles.header}>
                            <Text style={mainStyles.h1}>{lnObj.settings[language]}</Text>
                        </View>
                        <View style={setUpStyles.childFormHolder}>
                            <View style={setUpStyles.childFormMainInfo}>

                                <View style={[settingsStyles.row]}>
                                    <View style={settingsStyles.col}>
                                        {Platform.OS === 'android' ?
                                            <View style={settingsStyles.childSelector}>
                                                <Picker
                                                    selectedValue={activeChild}
                                                    onValueChange={
                                                        (itemValue, itemIndex) => {
                                                            setGender(itemValue)
                                                        }
                                                    }
                                                >
                                                    {[
                                                        children.map((element, i) => {
                                                            return (
                                                                <Picker.Item label={element.name} value={element.childId} />
                                                            )
                                                        })
                                                    ]}
                                                    <Picker.Item label="add new child" value="new child " />
                                                </Picker>
                                            </View>
                                            :
                                            <Pressable onPress={showActionSheetActiveChild} style={setUpStyles.genderPresSheet}>
                                                <Text style={setUpStyles.genderPresSheetText}>
                                                    {children[0].name}
                                                </Text>
                                            </Pressable>
                                        }
                                    </View>
                                    <View style={settingsStyles.col}>
                                        <Pressable onPress={() => {
                                        }} style={mainStyles.mainPlusBtn}>
                                            <Icon
                                                name='add-outline'
                                                type='ionicon'
                                                color='#fff'
                                                size={20}
                                                style={setUpStyles.signUpFormIcon}
                                            />
                                        </Pressable>
                                    </View>
                                </View>



                                <View style={setUpStyles.imageContainer}>
                                    {!addNewChildState ?
                                        <Pressable style={setUpStyles.imageContainerChanger} onPress={showPhotoAlert}>
                                            <Image style={setUpStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + pickedImagePath }} />
                                            <View style={setUpStyles.childPhotoIconChange}>
                                                <Icon
                                                    name='camera-outline'
                                                    type='ionicon'
                                                    color='#fff'
                                                    size={20}
                                                />
                                            </View>
                                        </Pressable>
                                        :
                                        <Pressable style={setUpStyles.childPhotoIconBlock} onPress={showPhotoAlert}>
                                            <Icon
                                                name='camera-outline'
                                                type='ionicon'
                                                color='#d3d3d3'
                                                size={30}
                                            />
                                            <Text style={[mainStyles.text, mainStyles.t_center, mainStyles.p]}>{lnObj.addPhoto[language]}</Text>
                                        </Pressable>
                                    }
                                </View>
                                <View style={setUpStyles.childFormInputsBlock}>
                                    <View style={setUpStyles.childFormInputsLabel}>
                                        <Text style={setUpStyles.childFormInputsLabelText}>{lnObj.childsName[language]}</Text>
                                    </View>
                                    <View style={[setUpStyles.textInWrap]}>
                                        <TextInput
                                            style={mainStyles.textInput}
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
                                            <Text style={setUpStyles.childFormInputsLabelText}>{lnObj.childsBirthDate[language]}</Text>
                                        </View>
                                        {Platform.OS === 'android' ?
                                            <View style={[setUpStyles.textInWrap, mainStyles.textInputWrapper]}>
                                                <View>
                                                    <Pressable style={{ padding: 5 }} onPress={() => { setShow(true); }}><Text style={mainStyles.textInput}>{Moment(dateOfBirth).format('DD.MM.yyyy')}</Text></Pressable>
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
                                            <Pressable onPress={showActionSheet} style={setUpStyles.genderPresSheet}>
                                                <Text style={setUpStyles.genderPresSheetText}>{gender == 'male' ? lnObj.male[language] : lnObj.female[language]}</Text>
                                            </Pressable>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={setUpStyles.setUpBlockWrapper}>
                                <View style={setUpStyles.setUpBlock}>
                                    <View style={setUpStyles.setUpHeader}>
                                        <View style={setUpStyles.row}>
                                            <Text style={setUpStyles.setUpHeaderText}>{lnObj.feeding[language]}</Text>
                                            <Pressable onPress={() => {
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
                                            </Pressable>
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
                                                        <Pressable key={element.scheduleId}
                                                            onPress={() => {
                                                                editSchedule(element.scheduleId, element.name, element.time, 'feeding')
                                                                setIosKeyboardPosition('position')
                                                            }}>
                                                            <ScheduleItem time={element.time} scheduleId={element.scheduleId} name={element.name} type="feeding" />
                                                        </Pressable>
                                                    )
                                                })
                                            ]}
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={setUpStyles.setUpBlock}>
                                    <View style={setUpStyles.setUpHeader}>
                                        <View style={setUpStyles.row}>
                                            <Text style={setUpStyles.setUpHeaderText}>{lnObj.sleep[language]}</Text>
                                            <Pressable onPress={() => {
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
                                            </Pressable>
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
                                                        <Pressable key={element.scheduleId} onPress={() => {
                                                            editSchedule(element.scheduleId, element.name, element.time, 'sleep')
                                                            setIosKeyboardPosition('position')
                                                        }}>
                                                            <ScheduleItem time={element.time} scheduleId={element.scheduleId} name={element.name} type="sleep" />
                                                        </Pressable>
                                                    )
                                                })
                                            ]}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={setUpStyles.childFormConfirm}>
                        <Pressable style={[mainStyles.mainButton, !isActiveButton ? mainStyles.disabledMainButton : '']} onPress={() => { saveChild() }}><Text style={[mainStyles.text, mainStyles.t_center, mainStyles.h4, mainStyles.textWhite]}>{lnObj.saveBtn[language]}</Text></Pressable>
                    </View>
                </View>
            </SafeAreaView>

            <BottomSheetSchedule activeType={activeType} childId={childId} userIdStored={userIdStored} activeTime={activeTime} activeName={activeName} activeScheduleId={activeScheduleId} type={changeType} />

        </KeyboardAvoidingView>
    );
}