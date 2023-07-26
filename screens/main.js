import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Image, Alert, TextInput, ActionSheetIOS, Platform, Keyboard } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { activeName, activePhoto, userId, setUpDone } from '../constants/constants';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadSchedules, addSchedule, loadChild, removeSchedule } from '../store/actions/records';


export default function Main({ navigation }) {
    const [userIdStored, setUserId] = useState('')
    const [language, setLanguage] = useState('')
    const [activeType, setActiveType] = useState('Feeding')
    const [records, setRecords] = useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}])
    const dispatch = useDispatch();

    const getStoreData = async () => {
        const values = await AsyncStorage.multiGet([userId]);
        setUserId(values[0][1])
        dispatch(loadChild(values[0][1]))
    }

    const setLocale = async () => {
        let locale = global.config.language
        setLanguage(locale)
    }

    const child = useSelector((state) => {
        return state.records.activeChild
    });

    const goToSettings = ()=>{
        navigation.push('Settings')
    }

    //console.log(child)

    useEffect(() => {
        setLocale()
        getStoreData()
    }, [])

    // useEffect(() => {
    //     dispatch(loadSchedules(userIdStored));
    // }, [dispatch, userIdStored]);

    //console.log(child)

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={mainStyles.screenContainer}>
                    <View style={mainStyles.headerBlock}>
                        <View style={mainStyles.headerUserCol}>
                            <View style={mainStyles.col}>
                                <Pressable style={mainStyles.headerUserProfile}>
                                    <View style={mainStyles.headerUserPhoto}>
                                        <Image style={mainStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + child[0].photo }} />
                                    </View>
                                    <View style={mainStyles.userNameHolder}>
                                        <View style={mainStyles.mainUserName}>
                                            <Text style={[mainStyles.headerUserName, mainStyles.text]}>{child[0].name}</Text>
                                        </View>
                                        <View style={[mainStyles.subUserInfo]}>
                                            <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{child[0].gender}, </Text>
                                            <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{Moment().diff(child[0].dob, 'years') == 0 ? Moment().diff(child[0].dob, 'months') : Moment().diff(child[0].dob, 'years')} y/o</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={mainStyles.headerActionControl}>
                            <View style={mainStyles.col}>
                                <Pressable onPress={() => {goToSettings()}} style={[mainStyles.settingButton, mainStyles.headerControlButton]}>
                                    <Icon
                                        name='settings-outline'
                                        type='ionicon'
                                        color='#3e3e3e'
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={mainStyles.headingTextBlock}>
                        <Text style={[mainStyles.h2_notBold]}>Feeding</Text>
                    </View>
                    <ScrollView style={mainStyles.mainScrollView}>
                        {[
                            records.map((element, i) => {
                                return (
                                    <View key={i} style={mainStyles.recordRow}>
                                        <View style={mainStyles.recordBlockWrapper}>
                                            <View style={mainStyles.col}>
                                                <View style={mainStyles.recordTextPartHolder}>
                                                    <View style={mainStyles.rtpIcon}>
                                                        <Icon
                                                            name='fast-food-outline'
                                                            type='ionicon'
                                                            color='#fff'
                                                        />
                                                    </View>
                                                    <View style={mainStyles.rtpText}>
                                                        <Text style={[mainStyles.rtpTextName, mainStyles.text]}>Breakfast</Text>
                                                        <Text style={[mainStyles.text, mainStyles.rtpTextDate]}>{Moment(new Date()).format('DD.MM.YYYY')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={mainStyles.col}>
                                                <View style={mainStyles.recordTime}>
                                                    <Text style={[mainStyles.recordTimeText, mainStyles.text]}>09:35</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={mainStyles.timeCheckBlock}>
                                            <View style={mainStyles.timeCheckBlockWrappers}>
                                                <View style={mainStyles.tcb_pill}>
                                                    <View style={mainStyles.tcb_pill_icon}>
                                                        <Icon
                                                            name='checkmark-circle-outline'
                                                            type='ionicon'
                                                            color='#25D16A'
                                                        />
                                                    </View>
                                                    <View style={mainStyles.tcb_pill_text}>
                                                        <Text style={[mainStyles.tcb_pill_text, mainStyles.text]}>Well done!</Text>
                                                    </View>
                                                </View>
                                                <View style={mainStyles.tcb_timePass}>
                                                    <Text style={[mainStyles.text, mainStyles.tcb_TextDate]}>3 hours left</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        ]}
                    </ScrollView>
                    <View style={mainStyles.bottomMenuHolder}>
                        <View style={mainStyles.bottomMenu}>
                            <View style={mainStyles.col}>
                                <Pressable onPress={() => { }} style={[mainStyles.bottomMeuButton, mainStyles.bm_feeding]}>
                                    <Icon
                                        name='fast-food-outline'
                                        type='ionicon'
                                        color='#fff'
                                    />
                                </Pressable>
                            </View>
                            <View style={mainStyles.col}>
                                <Pressable onPress={() => { }} style={[mainStyles.bottomMeuButton, mainStyles.addRecordButton]}>
                                    <Icon
                                        name='add-outline'
                                        type='ionicon'
                                        color='#fff'
                                    />
                                </Pressable>
                            </View>
                            <View style={mainStyles.col}>
                                <Pressable onPress={() => { }} style={[mainStyles.bottomMeuButton, mainStyles.bm_sleep]}>
                                    <Icon
                                        name='moon-outline'
                                        type='ionicon'
                                        color='#5379FF'
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}