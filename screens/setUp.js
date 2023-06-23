import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Image, Alert, TextInput, ActionSheetIOS, Platform, Keyboard } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { Icon, Input } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { activeName, activePhoto, userId } from '../constants/constants';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import * as SQLite from "expo-sqlite";
import AsyncStorage from '@react-native-async-storage/async-storage';
const db = SQLite.openDatabase("db.db");

export default function SetUp(navigateion) {
    const [language, setLanguage] = useState('')
    const [userIdStored, setUserId] = useState('')
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [gender, setGender] = useState('Male');
    const [childName, setChildName] = useState('')
    const [dateOfBirth, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [scedule, setSchedule] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [activeType, setActiveType] = useState('feeding')
    const [scheduleName, setScheduleName] = useState('')
    const [scheduleTime, setScheduleTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const getStoreData = async () => {
        const values = await AsyncStorage.multiGet([userId]);
        setUserId(values[0][1])
    }

    const setLocale = async () => {
        let locale = global.config.language
        setLanguage(locale)
    }

    useEffect(() => {
        setLocale()
        getStoreData()
    }, [])

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const onChangeTimeSchedule = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setScheduleTime(currentDate);
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
                options: ['Cancel', 'Male', 'Female'],
                //destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    setGender('Male');
                } else if (buttonIndex === 2) {
                    setGender('Female');
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
        console.log('gchc')
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
        let userIdVal = await AsyncStorage.getItem(userId)

        await AsyncStorage.multiSet([[activePhoto, pickedImagePath], [activeName, childName]]).then(() => {
        }).catch((error) => { console.error(error) })

        db.transaction(tx => {
            tx.executeSql("Insert into children (userId, name, dob, gender, photo) values (?, ?, ?, ?, ?);", [userIdVal, childName, Moment(dateOfBirth).format("YYYY-MM-DD"), gender, pickedImagePath],
                () => {
                    console.log('Insert successfully')
                },
                (error) => console.error(error));
        });
    }

    const setSchedulePress = async () => {
        db.transaction(tx => {
            tx.executeSql("Insert into schedule (userId, type, name, time) values (?, ?, ?, ?);", [userIdStored, activeType, scheduleName, Moment(scheduleTime).format("YYYY-MM-DD HH:mm:ss.SSS")],
                () => {
                    console.log('Insert successfully')
                    setIsVisible(false)
                    setScheduleName('')
                    setScheduleTime((new Date(new Date().setHours(0, 0, 0, 0))))
                    Keyboard.dismiss()
                },
                (error) => console.error(error));

            tx.executeSql("select * from schedule where userId=?", [userIdStored], (_, { rows: { _array } }) => {
                setSchedule(_array)
                console.log(_array)
                setIsVisible(false)
            })
        });

    }

    const deleteItemFromSchedule = async (item, scheduleType) => {
        db.transaction(tx => {
            tx.executeSql("Delete from schedule where type=? and userId=? and scheduleId =?", [scheduleType, userIdStored, item],
                () => {
                    console.log('delete successfully')
                },
                (error) => console.log('error', error));

            tx.executeSql("select * from schedule where userId=?", [userIdStored], 
            (_, { rows: { _array } }) => {
                setSchedule(_array)
                setIsVisible(false)
            },
            (error) => console.log('error', error))
        });
    }

    useEffect(() => {

        db.transaction(tx => {
            tx.executeSql(
                "drop table children;", [],
                () => //console.log('Table children dropped successfully'),
                    (error) => console.log('Error dropping table children: ', error)
            );

            tx.executeSql(
                "drop table schedule;", [],
                () => //console.log('Table schedule dropped successfully'),
                    (error) => console.log('Error dropping table schedule: ', error)
            );

            tx.executeSql(
                "drop table tasks;", [],
                () => //console.log('Table tasks dropped successfully'),
                    (error) => console.log('Error dropping table tasks: ', error)
            );

            tx.executeSql(
                "create table if not exists children (childrenID INTEGER PRIMARY KEY AUTOINCREMENT, userId text, name text, dob date, gender text, photo blob, isActive boolean);", [],
                () => //console.log('Table children created successfully'),
                    (error) => console.log('Error creating table children: ', error)
            );

            tx.executeSql(
                "create table if not exists schedule (scheduleId INTEGER PRIMARY KEY AUTOINCREMENT, userId text, type text, name text, time date);", [],
                () => //console.log('Table schedule created successfully'),
                    (error) => console.log('Error creating table schedule: ', error)
            );

            tx.executeSql(
                "create table if not exists tasks (userId text, type text, name text, time date);", [],
                () => //console.log('Table tasks created successfully'),
                    (error) => console.log('Error creating table tasks: ', error)
            );

            tx.executeSql("select * from children", [], (_, { rows: { _array } }) => {
            });

            tx.executeSql("select * from schedule where type=? and userId=?", ['feeding', userIdStored], (_, { rows: { _array } }) => {
                setSchedule(_array)
            }
            );
        });

    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <SafeAreaView style={setUpStyles.wrapper}>
                <View style={setUpStyles.container}>
                    <ScrollView style={setUpStyles.scrollViewMain}>
                        <View style={mainStyles.header}>
                            <Text style={mainStyles.h1}>{lnObj.completeProfileH1[language]}</Text>
                        </View>
                        <View style={setUpStyles.childFormHolder}>
                            <View>
                                <View style={setUpStyles.imageContainer}>
                                    {pickedImagePath !== '' ?
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
                                                            testID="dateTimePicker"
                                                            value={dateOfBirth}
                                                            mode={mode}
                                                            is24Hour={true}
                                                            onChange={onChangeDate}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                            :
                                            <View style={{ flex: 0, justifyContent: 'flex-start', width: '100%', textAlign: 'left', alignItems: 'flex-start' }}>
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateOfBirth}
                                                    mode={mode}
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
                                                    style={{ height: 50 }}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        setGender(itemValue)
                                                    }>
                                                    <Picker.Item label="Male" value="male" />
                                                    <Picker.Item label="Female" value="female" />
                                                </Picker>
                                            </View>
                                            :
                                            <Pressable onPress={showActionSheet} style={setUpStyles.genderPresSheet}>
                                                <Text style={setUpStyles.genderPresSheetText}>{gender}</Text>
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
                                                setActiveType('feeding')
                                            }} style={mainStyles.mainPlusBtn}>
                                                <Icon
                                                    name='add-outline'
                                                    type='ionicon'
                                                    color='#fff'
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
                                                scedule.filter(item => item.type == "feeding").map((element, i) => {
                                                    return (
                                                        <View key={element.scheduleId} style={setUpStyles.setUpCard}>
                                                            <View style={setUpStyles.setUpCardTitle}>
                                                                <Text style={setUpStyles.setUpCardName}>{element.name}</Text>
                                                                <Pressable style={setUpStyles.setUpCardIconDelete} onPress={() => { deleteItemFromSchedule(element.scheduleId, 'feeding') }}>
                                                                    <Icon
                                                                        name='trash-outline'
                                                                        type='ionicon'
                                                                        color='#3e3e3e'
                                                                        size={15}
                                                                    />
                                                                </Pressable>
                                                            </View>
                                                            <View style={setUpStyles.setUpCardRow}>
                                                                <View style={setUpStyles.setUpCardIcon}>
                                                                    <Icon
                                                                        name='alarm-outline'
                                                                        type='ionicon'
                                                                        color='#fff'
                                                                        size={20}
                                                                    />
                                                                </View>
                                                                <View style={setUpStyles.setUpCardTextHolder}><Text style={setUpStyles.setUpCardText}>{Moment(element.time).format('HH:mm')}</Text></View>
                                                            </View>
                                                        </View>
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
                                            }} style={mainStyles.mainPlusBtn}>
                                                <Icon
                                                    name='add-outline'
                                                    type='ionicon'
                                                    color='#fff'
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
                                                scedule.filter(item => item.type == "sleep").map((element, i) => {
                                                    return (
                                                        <View key={element.scheduleId} style={setUpStyles.setUpCard}>
                                                            <View style={setUpStyles.setUpCardTitle}>
                                                                <Text style={setUpStyles.setUpCardName}>{element.name}</Text>
                                                                <Pressable style={setUpStyles.setUpCardIconDelete} onPress={() => { deleteItemFromSchedule(element.scheduleId, 'sleep') }}>
                                                                    <Icon
                                                                        name='trash-outline'
                                                                        type='ionicon'
                                                                        color='#3e3e3e'
                                                                        size={15}
                                                                    />
                                                                </Pressable>
                                                            </View>
                                                            <View style={setUpStyles.setUpCardRow}>
                                                                <View style={setUpStyles.setUpCardIcon}>
                                                                    <Icon
                                                                        name='moon-outline'
                                                                        type='ionicon'
                                                                        color='#fff'
                                                                        size={20}
                                                                    />
                                                                </View>
                                                                <View style={setUpStyles.setUpCardTextHolder}><Text style={setUpStyles.setUpCardText}>{Moment(element.time).format('HH:mm')}</Text></View>
                                                            </View>
                                                        </View>
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
                        <Pressable style={mainStyles.mainButton} onPress={saveChild}><Text style={[mainStyles.text, mainStyles.t_center, mainStyles.h4, mainStyles.textWhite]}>{lnObj.saveBtn[language]}</Text></Pressable>
                    </View>
                </View>
            </SafeAreaView>
            <Pressable style={[bottomSheetStyles.wrapper, { display: isVisible ? 'flex' : 'none' }]}>
                <Pressable style={bottomSheetStyles.blackBlock} onPress={() => setIsVisible(false)} ></Pressable>
                <View style={bottomSheetStyles.whiteBlock}>
                    <View style={bottomSheetStyles.ScrollView}>
                        <View style={setUpStyles.createForm}>
                            <View><Text style={mainStyles.h1}>{activeType == 'feeding' ? lnObj.newMealSchedule[language] : lnObj.newBedTimeSchedule[language]}</Text></View>
                            <View>
                                <View style={mainStyles.inputLabel}>
                                    <Text style={mainStyles.inputLabelText}>{lnObj.feedingName[language]}</Text>
                                </View>
                                <View style={mainStyles.textInputWrapper}>
                                    <TextInput
                                        style={mainStyles.textInput}
                                        value={scheduleName}
                                        onChangeText={(value) => { setScheduleName(value) }}
                                        placeholder=""
                                        placeholderTextColor="#d3d3d3" ß
                                    ></TextInput>
                                </View>
                            </View>
                            <View>
                                <View style={mainStyles.inputLabel}>
                                    <Text style={mainStyles.inputLabelText}>{lnObj.feedingTime[language]}</Text>
                                </View>

                                {Platform.OS === 'android' ?
                                    <View style={mainStyles.textInputWrapper}>
                                        <View>
                                            <Pressable style={{ padding: 5 }} onPress={() => { setShow(true); }}><Text style={mainStyles.textInput}>{Moment(scheduleTime).format('HH:mm')}</Text></Pressable>
                                            {show && (
                                                <DateTimePicker
                                                    testID="scheduleTimePiker"
                                                    value={scheduleTime}
                                                    mode={'time'}
                                                    is24Hour={true}
                                                    display="spinner"
                                                    onChange={onChangeTimeSchedule}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flex: 0, justifyContent: 'flex-start', width: '100%', textAlign: 'left', alignItems: 'center' }}>
                                        <DateTimePicker
                                            testID="scheduleTimePiker"
                                            value={scheduleTime}
                                            mode={'time'}
                                            is24Hour={true}
                                            display="spinner"
                                            locale="ru-RU"
                                            onChange={onChangeTimeSchedule}
                                        />
                                    </View>
                                }

                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Pressable style={[mainStyles.mainButton]} onPress={setSchedulePress} >
                                    <Text style={mainStyles.mainButtonText}>{lnObj.saveBtn[language]}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}