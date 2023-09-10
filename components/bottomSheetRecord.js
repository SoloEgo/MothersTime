import { useEffect, useState } from 'react';
import { Text, View, Pressable, TouchableOpacity, Platform, Keyboard, ActionSheetIOS } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import { Picker } from '@react-native-picker/picker';
import { addRecord, setBottomRecordSheetVisible, editRecord, removeRecord } from '../store/actions/records';

export default function BottomSheetRecord(props) {
    const [recordName, setRecordName] = useState('')
    const [recordIndex, setRecordIndex] = useState('')
    const [recordTime, setRecordTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const [recordDate, setRecordDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const [recordTimeEnd, setRecordTimeEnd] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const [recordDateEnd, setRecordDateEnd] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
    const [showTime, setShowTime] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTimeEnd, setShowTimeEnd] = useState(false);
    const [showDateEnd, setShowDateEnd] = useState(false);

    const activeType = props.activeType
    const userIdStored = props.userIdStored
    const childId = props.childId

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    const isVisible = useSelector((state) => {
        return state.records.bottomRecordSheetVisible
    });

    const schedulesRaw = useSelector((state) => {
        return state.records.allSchedules
    })

    const schedules = schedulesRaw.filter(item => item.type == activeType)

    const setIsVisible = async (visibility) => {
        dispatch(setBottomRecordSheetVisible(visibility))
        Keyboard.dismiss()
    }

    const findClosestSchedule = () => {
        let a = Moment(new Date())
        let minDiff = 0
        let resultIndex = 0
        for (let index = 0; index < schedules.length; index++) {
            let b = Moment(schedules[index].time)
            let c = Math.abs(Moment.duration(b.diff(a)))
            if (index == 0) {
                minDiff = c
            } else {
                if (c < minDiff) {
                    minDiff = c
                    resultIndex = index
                }
            }
        }
        return resultIndex
    }

    useEffect(() => {

        if (props.type == 'edit') {
            console.log(props.activeDateTime)
            console.log(props.activeDateTimeEnd)
            console.log(props.activeName)
            setRecordName(props.activeName)
            setRecordDate(new Date(props.activeDateTime))
            setRecordTime(new Date(props.activeDateTime))
            setRecordDateEnd(new Date(props.activeDateTimeEnd))
            setRecordTimeEnd(new Date(props.activeDateTimeEnd))
        } else {
            setRecordName('')
            setRecordDate(new Date())
            setRecordTime(new Date())
            setRecordDateEnd(null)
            setRecordTimeEnd(null)
            if (schedules.length > 0) {
                let resIndex = findClosestSchedule()
                setRecordName(schedules[resIndex].name)
                setRecordIndex(schedules[resIndex].scheduleId)
            }
        }
    }, [props.type, props.activeName, props.activeAttr1])

    useEffect(() => {
        setDefaultValues()
    }, [props.activeType, props.nowActiveDateTime])

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', ...schedules.map(i => i.name)],
                //destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else {
                    setRecordName(schedules[buttonIndex - 1].name);
                    setRecordIndex(schedules[buttonIndex - 1].index)
                }
            },
        );
    }

    const onChangeTimeRecord = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTime(false);
        setRecordTime(currentDate);
    };

    const onChangeDateRecord = (event, selectedDate) => {
        setShowDate(false);
        setRecordDate(selectedDate);
    };
    const onChangeTimeEndRecord = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTimeEnd(false);
        setRecordTimeEnd(currentDate);
    };

    const onChangeDateEndRecord = (event, selectedDate) => {
        setShowDateEnd(false);
        setRecordDateEnd(selectedDate);
    };

    const setDefaultValues = () => {
        if (props.type != 'edit') {
            if (schedules.length > 0) {
                let resIndex = findClosestSchedule()
                setRecordName(schedules[resIndex].name)
                setRecordIndex(schedules[resIndex].scheduleId)
            }
            setRecordDateEnd(null)
            setRecordTimeEnd(null)
        }
    }

    const setRecordPress = async () => {

        let dateTimeEnd

        if (recordDateEnd && recordTimeEnd) {
            dateTimeEnd = Moment(recordDateEnd).format("YYYY-MM-DD") + ' ' + Moment(recordTimeEnd).format("HH:mm:ss.SSS")
        } else {
            dateTimeEnd = Moment(new Date('1900-01-01 00:00:00.000')).format("YYYY-MM-DD")
        }

        const record = {
            userId: userIdStored,
            childId: childId,
            type: activeType,
            scheduleId: recordIndex ?? schedules[0].name,
            name: recordName ?? schedules[0].name,
            dateTime: Moment(recordDate).format("YYYY-MM-DD") + ' ' + Moment(recordTime).format("HH:mm:ss.SSS"),
            dateTimeEnd: activeType == 'feeding' ? (Moment(recordDate).format("YYYY-MM-DD") + ' ' + Moment(recordTime).format("HH:mm:ss.SSS")) : dateTimeEnd,
            attr1: ''
        }

        dispatch(addRecord(record));
        setIsVisible(false)
        setDefaultValues()
        Keyboard.dismiss()
    }

    const editRecordPress = async () => {
        let dateTimeEnd

        if (recordDateEnd && recordTimeEnd && Moment(recordDateEnd).format("YYYY-MM-DD") != '1900-01-01') {
            dateTimeEnd = Moment(recordDateEnd).format("YYYY-MM-DD") + ' ' + Moment(recordTimeEnd).format("HH:mm:ss.SSS")
        } else {
            dateTimeEnd = Moment(new Date('1900-01-01 00:00:00.000')).format("YYYY-MM-DD")
        }

        const record = {
            userId: userIdStored,
            childId: childId,
            type: activeType,
            scheduleId: recordIndex,
            name: recordName,
            dateTime: Moment(recordDate).format("YYYY-MM-DD") + ' ' + Moment(recordTime).format("HH:mm:ss.SSS"),
            dateTimeEnd: activeType == 'feeding' ? (Moment(recordDate).format("YYYY-MM-DD") + ' ' + Moment(recordTime).format("HH:mm:ss.SSS")) : dateTimeEnd,
            attr1: '',
            recordId: props.activeRecordId
        }

        dispatch(editRecord(record));
        setIsVisible(false)
        setDefaultValues()
        Keyboard.dismiss()
    }

    const deleteItemFromRecord = async () => {
        dispatch(removeRecord(userIdStored, props.activeRecordId))
        setIsVisible(false)
    }

    const makeSelection = (itemValue, itemIndex) => {
        if (schedules.length > 0) {
            setRecordName(itemValue)
            setRecordIndex(schedules[itemIndex].scheduleId)
        }
    }

    return (
        <Pressable style={[bottomSheetStyles.wrapper, { display: isVisible ? 'flex' : 'none' }]}>
            <Pressable style={bottomSheetStyles.blackBlock} onPress={() => {
                setIsVisible(false)
                setRecordDateEnd(null)
                setRecordTimeEnd(null)
            }} ></Pressable>
            <View style={bottomSheetStyles.whiteBlock}>
                <View style={bottomSheetStyles.ScrollView}>
                    <View style={setUpStyles.createForm}>
                        <View>
                            <Text style={[mainStyles.h1, { marginBottom: 30 }]}>{
                                activeType == 'feeding'
                                    ?
                                    props.type == 'edit' ? lnObj.editMealSchedule[language] : lnObj.newMealSchedule[language]
                                    :
                                    props.type == 'edit' ? lnObj.editBedTimeSchedule[language] : lnObj.newBedTimeSchedule[language]
                            }</Text>
                        </View>

                        <View style={bottomSheetStyles.row}>
                            <View style={bottomSheetStyles.inputLabelRow}>
                                <Text style={mainStyles.inputLabelText}>{lnObj.feedingName[language]}</Text>
                            </View>
                            <View style={[bottomSheetStyles.textInputWrapper]}>
                            </View>
                            <View style={bottomSheetStyles.childFormInputsBlock_1}>
                                {Platform.OS === 'android' ?
                                    <View>
                                        <View style={[mainStyles.textSelectWrapper]}>
                                            <Picker
                                                selectedValue={recordName}
                                                style={{ height: 47, marginTop: -7 }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    makeSelection(itemValue, itemIndex)
                                                }
                                                }>
                                                {[
                                                    schedules.map((element, i) => {
                                                        return (
                                                            <Picker.Item key={i} label={element.name} value={element.name} />
                                                        )
                                                    })
                                                ]}
                                            </Picker>
                                        </View>
                                    </View>
                                    :
                                    <Pressable onPress={showActionSheet} style={setUpStyles.genderPresSheet}>
                                        <Text style={setUpStyles.genderPresSheetText}>{recordName}</Text>
                                    </Pressable>
                                }
                            </View>
                        </View>

                        <View style={bottomSheetStyles.sleepTimeBlock}>
                            <Text style={[mainStyles.inputLabelText, mainStyles.inputLabelTextSleep]}>{activeType == 'sleep' ? lnObj.childGoToSleep[language] : lnObj.childGoToEat[language]}</Text>
                            <View style={bottomSheetStyles.row}>
                                <View style={bottomSheetStyles.inputLabelRow}>
                                    <Text style={mainStyles.inputLabelText}>{lnObj.date[language]}</Text>
                                </View>

                                {Platform.OS === 'android' ?
                                    <View style={bottomSheetStyles.textInputWrapper}>
                                        <View>
                                            <Pressable style={{ padding: 5 }} onPress={() => { setShowDate(true); }}><Text style={mainStyles.textInput}>{Moment(recordDate).format('DD.MM.yyyy')}</Text></Pressable>
                                            {showDate && (
                                                <DateTimePicker
                                                    testID="recordTimePiker"
                                                    value={recordDate}
                                                    mode={'date'}
                                                    onChange={onChangeDateRecord}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    :
                                    <View style={{ marginLeft: -10 }}>
                                        <DateTimePicker
                                            testID="recordTimePiker"
                                            value={recordDate}
                                            mode={'date'}
                                            locale="ru-RU"
                                            onChange={onChangeDateRecord}
                                        />
                                    </View>
                                }
                                <View>
                                    <Text style={[mainStyles.text, bottomSheetStyles.todayText]} >{Moment(recordDate).format('DD.MM.yyyy') == Moment(new Date()).format('DD.MM.yyyy') ? ` - ${lnObj.todayText[language]}` : ''}</Text>
                                </View>
                            </View>
                            <View style={bottomSheetStyles.row}>
                                <View style={bottomSheetStyles.inputLabelRow}>
                                    <Text style={mainStyles.inputLabelText}>{lnObj.feedingTime[language]}</Text>
                                </View>

                                {Platform.OS === 'android' ?
                                    <View style={bottomSheetStyles.textInputWrapper}>
                                        <View>
                                            <Pressable style={{ padding: 5 }} onPress={() => { setShowTime(true); }}><Text style={mainStyles.textInput}>{Moment(recordTime).format('HH:mm')}</Text></Pressable>
                                            {showTime && (
                                                <DateTimePicker
                                                    testID="recordTimePiker"
                                                    value={recordTime}
                                                    mode={'time'}
                                                    is24Hour={true}
                                                    display="spinner"
                                                    onChange={onChangeTimeRecord}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    :
                                    <View style={{ marginLeft: -10 }}>
                                        <DateTimePicker
                                            testID="recordTimePiker"
                                            value={recordTime}
                                            mode={'time'}
                                            is24Hour={true}
                                            display="clock"
                                            locale="ru-RU"
                                            onChange={onChangeTimeRecord}
                                        />
                                    </View>
                                }
                            </View>
                        </View>


                        {activeType == 'sleep' ?
                            <View>

                                {recordDateEnd != null && recordDateEnd.getFullYear() != '1900' ?
                                    <View style={bottomSheetStyles.sleepTimeBlock}>
                                        <Text style={[mainStyles.inputLabelText, mainStyles.inputLabelTextSleep]}>{lnObj.childWakesUpAt[language]}</Text>
                                        <View style={bottomSheetStyles.row}>
                                            <View style={bottomSheetStyles.inputLabelRow}>
                                                <Text style={mainStyles.inputLabelText}>{lnObj.date[language]}</Text>
                                            </View>

                                            {Platform.OS === 'android' ?
                                                <View style={bottomSheetStyles.textInputWrapper}>
                                                    <View>
                                                        <Pressable style={{ padding: 5 }} onPress={() => { setShowDateEnd(true); }}><Text style={mainStyles.textInput}>{Moment(recordDateEnd).format('DD.MM.yyyy')}</Text></Pressable>
                                                        {showDateEnd && (
                                                            <DateTimePicker
                                                                testID="recordTimePiker"
                                                                value={recordDateEnd}
                                                                mode={'date'}
                                                                onChange={onChangeDateEndRecord}
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                                :
                                                <View style={{ marginLeft: -10 }}>
                                                    <DateTimePicker
                                                        testID="recordTimePiker"
                                                        value={recordDateEnd}
                                                        mode={'date'}
                                                        locale="ru-RU"
                                                        onChange={onChangeDateEndRecord}
                                                    />
                                                </View>
                                            }

                                        </View>
                                        <View style={bottomSheetStyles.row}>
                                            <View style={bottomSheetStyles.inputLabelRow}>
                                                <Text style={mainStyles.inputLabelText}>{lnObj.feedingTime[language]}</Text>
                                            </View>

                                            {Platform.OS === 'android' ?
                                                <View style={bottomSheetStyles.textInputWrapper}>
                                                    <View>
                                                        <Pressable style={{ padding: 5 }} onPress={() => { setShowTimeEnd(true); }}><Text style={mainStyles.textInput}>{Moment(recordTimeEnd).format('HH:mm')}</Text></Pressable>
                                                        {showTimeEnd && (
                                                            <DateTimePicker
                                                                testID="recordTimePiker"
                                                                value={recordTimeEnd}
                                                                mode={'time'}
                                                                is24Hour={true}
                                                                display="spinner"
                                                                onChange={onChangeTimeEndRecord}
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                                :
                                                <View style={{ marginLeft: -10 }}>
                                                    <DateTimePicker
                                                        testID="recordTimePiker"
                                                        value={recordTimeEnd}
                                                        mode={'time'}
                                                        is24Hour={true}
                                                        display="clock"
                                                        locale="ru-RU"
                                                        onChange={onChangeTimeEndRecord}
                                                    />
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    :
                                    <View style={bottomSheetStyles.sleepTimeBlock}>
                                        <Text style={[mainStyles.inputLabelText, mainStyles.inputLabelTextSleep]}>{lnObj.childWakesUp[language]}?</Text>
                                        <View style={mainStyles.row}>
                                            <TouchableOpacity onPress={() => {
                                                setRecordDateEnd(new Date())
                                                setRecordTimeEnd(new Date())
                                            }} style={[mainStyles.mainButton]}><Text style={mainStyles.mainButtonText}>{lnObj.yes[language]}</Text></TouchableOpacity>
                                            <TouchableOpacity style={[mainStyles.mainButton]}><Text style={mainStyles.mainButtonText}>{lnObj.no[language]}</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                }

                            </View>
                            : ""}

                        <View style={{ alignItems: "center" }}>
                            {props.type != 'edit' ?
                                <Pressable style={[mainStyles.mainButton]} onPress={setRecordPress} >
                                    <Text style={mainStyles.mainButtonText}>{lnObj.saveBtn[language]}</Text>
                                </Pressable>
                                :
                                <View style={mainStyles.row}>
                                    <Pressable style={[mainStyles.mainButton]} onPress={() => { editRecordPress() }} >
                                        <Text style={mainStyles.mainButtonText}>{lnObj.editBtn[language]}</Text>
                                    </Pressable>
                                    <Pressable style={[mainStyles.mainButtonDelete]} onPress={() => { deleteItemFromRecord() }} >
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