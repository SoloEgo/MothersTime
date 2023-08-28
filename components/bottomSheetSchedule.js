import { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, Platform, Keyboard } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import { addSchedule, setBottomSheetVisible, removeSchedule, editSchedule } from '../store/actions/records';

export default function BottomSheetSchedule(props) {
    const [scheduleName, setScheduleName] = useState('')
    const [scheduleTime, setScheduleTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const [showTime, setShowTime] = useState(false);
    const activeType = props.activeType
    const userIdStored = props.userIdStored
    const childId = props.childId

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    const isVisible = useSelector((state) => {
        return state.records.bottomSheetVisible
    });

    const setIsVisible = async (visibility) => {
        dispatch(setBottomSheetVisible(visibility))
        Keyboard.dismiss()
    }

    useEffect(() => {
        props.type == 'edit' ? setScheduleName(props.activeName) : setScheduleName('')
        if (props.type == 'edit') {
            let time = new Date(props.activeTime)
            let hours = time.getHours()
            let minutes = time.getMinutes()
            setScheduleTime(new Date(new Date().setHours(hours, minutes, 0, 0)))
        }
    }, [props.type, props.activeName])

    const onChangeTimeSchedule = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTime(false);
        setScheduleTime(currentDate);
    };

    const setSchedulePress = async () => {
        const scheduleRecord = {
            userId: userIdStored,
            type: activeType,
            name: scheduleName,
            time: Moment(scheduleTime).format("YYYY-MM-DD HH:mm:ss.SSS"),
            childId: childId
        }
        dispatch(addSchedule(scheduleRecord));
        setIsVisible(false)
        setScheduleName('')
        Keyboard.dismiss()
    }

    const editSchedulePress = async () => {

        const scheduleRecord = {
            userId: userIdStored,
            childId: childId,
            scheduleId: props.activeScheduleId,
            name: scheduleName,
            time: Moment(scheduleTime).format("YYYY-MM-DD HH:mm:ss.SSS")
        }

        dispatch(editSchedule(scheduleRecord));
        setIsVisible(false)
        setScheduleName('')
        Keyboard.dismiss()
    }

    const deleteItemFromSchedule = async () => {
        dispatch(removeSchedule(userIdStored, childId, props.activeScheduleId, activeType))
        setIsVisible(false)
    }

    return (
        <Pressable style={[bottomSheetStyles.wrapper, { display: isVisible ? 'flex' : 'none' }]}>
            <Pressable style={bottomSheetStyles.blackBlock} onPress={() => setIsVisible(false)} ></Pressable>
            <View style={bottomSheetStyles.whiteBlock}>
                <View style={bottomSheetStyles.ScrollView}>
                    <View style={setUpStyles.createForm}>
                        <View><Text style={[mainStyles.h1, { marginBottom: 30 }]}>{activeType == 'feeding' ? lnObj.newMealSchedule[language] : lnObj.newBedTimeSchedule[language]}</Text></View>
                        <View style={bottomSheetStyles.row}>
                            <View style={bottomSheetStyles.inputLabelRow}>
                                <Text style={mainStyles.inputLabelText}>{lnObj.feedingName[language]}</Text>
                            </View>
                            <View style={[bottomSheetStyles.textInputWrapper]}>
                                <TextInput
                                    style={mainStyles.textInput}
                                    value={scheduleName}
                                    onChangeText={(value) => { setScheduleName(value) }}
                                    placeholder=""
                                    placeholderTextColor="#d3d3d3"
                                    autoCorrect={false}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={bottomSheetStyles.row}>
                            <View style={bottomSheetStyles.inputLabelRow}>
                                <Text style={mainStyles.inputLabelText}>{lnObj.feedingTime[language]}</Text>
                            </View>

                            {Platform.OS === 'android' ?
                                <View style={bottomSheetStyles.textInputWrapper}>
                                    <View>
                                        <Pressable style={{ padding: 5 }} onPress={() => { setShowTime(true); }}><Text style={mainStyles.textInput}>{Moment(scheduleTime).format('HH:mm')}</Text></Pressable>
                                        {showTime && (
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
                                <View style={{ marginLeft: -10}}>
                                    <DateTimePicker
                                        testID="scheduleTimePiker"
                                        value={scheduleTime}
                                        mode={'time'}
                                        is24Hour={true}
                                        display="clock"
                                        locale="ru-RU"
                                        onChange={onChangeTimeSchedule}
                                    />
                                </View>
                            }
                        </View>
                        <View style={{ alignItems: "center" }}>
                            {props.type != 'edit' ?
                                <Pressable style={[mainStyles.mainButton]} onPress={setSchedulePress} >
                                    <Text style={mainStyles.mainButtonText}>{lnObj.saveBtn[language]}</Text>
                                </Pressable>
                                :
                                <View style={mainStyles.row}>
                                    <Pressable style={[mainStyles.mainButton]} onPress={() => { editSchedulePress() }} >
                                        <Text style={mainStyles.mainButtonText}>{lnObj.editBtn[language]}</Text>
                                    </Pressable>
                                    <Pressable style={[mainStyles.mainButtonDelete]} onPress={() => { deleteItemFromSchedule() }} >
                                        <Icon
                                            name='trash-outline'
                                            type='ionicon'
                                            color='#E53935'
                                            size={15}
                                            style={setUpStyles.signUpFormIcon}
                                        />
                                        <Text style={mainStyles.mainButtonDeleteText}>{lnObj.deleteBtn[language]}</Text>
                                    </Pressable>
                                </View>
                            }

                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}