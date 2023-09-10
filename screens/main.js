import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import { themeStyles } from '../assets/styles/themeStyles';
import { Icon } from 'react-native-elements'
import Moment from 'moment';
import { lnObj } from '../constants/language';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../components/header';
import BottomSheetRecord from '../components/bottomSheetRecord';
import { setBottomRecordSheetVisible } from '../store/actions/records';
import { loadSchedules, loadRecords } from '../store/actions/records';
import TimeCheckBlock from '../components/timeCheckBlock';


export default function Main({ navigation }) {
    const [activeType, setActiveType] = useState('feeding')
    const [childId, setSChildId] = useState(1)
    const [activeDateTime, setActiveDateTime] = useState('')
    const [activeDateTimeEnd, setActiveDateTimeEnd] = useState('')
    const [activeName, setActiveName] = useState('')
    const [activeScheduleId, setActiveScheduleId] = useState('')
    const [activeRecordId, setActiveRecordId] = useState('')
    const [activeAttr1, setActiveAttr1] = useState('');
    const [changeType, setChangeType] = useState('add')
    const [nowDateTime, setNowDateTime] = useState(new Date())

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    useEffect(() => {
        dispatch(loadSchedules(userId, childId));
        dispatch(loadRecords(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        setInterval(() => {
            setNowDateTime(new Date())

        }, 60000);
    }, [nowDateTime]);

    const userId = useSelector((state) => {
        return state.records.userId
    })

    const records = useSelector((state) => {
        return state.records.allRecords
    });

    const recordsFiltered = records.filter(item => item.type == activeType)
    recordsFiltered.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : (a.dateTime > b.dateTime) ? -1 : 0)

    const schedulesRaw = useSelector((state) => {
        return state.records.allSchedules
    })

    let schedules = schedulesRaw.filter(item => item.type == activeType)

    const child = useSelector((state) => {
        return state.records.activeChild ?? [{ "childrenID": 1, "dob": "", "gender": "", "name": "", "photo": "", "userId": "" }]
    });

    const setIsVisible = async (visibility) => {
        dispatch(setBottomRecordSheetVisible(visibility))
    }

    const findDiffRecordsDates = (i) => {

        let a = activeType == 'feeding' ? Moment(recordsFiltered[i].dateTimeEnd) : Moment(recordsFiltered[i].dateTimeEnd)
        let b = i <= 0 ? Moment(nowDateTime) : Moment(recordsFiltered[i - 1].dateTime)
        let c = Moment.duration(b.diff(a))
        recordsFiltered[i].timeDiff = c
        let daysDiff = c.days() > 0 ? `${c.days()} ${lnObj.days[language].substring(0, 1)}.` : ''
        let hoursDiff = c.hours() > 0 ? `${c.hours()} ${lnObj.hours[language].substring(0, 1)}.` : ''
        let minutesDiff = `${c.minutes()} ${lnObj.minutes[language].substring(0, 1)}.`
        let activeDateTime = activeType == 'feeding' ? i == 0 ? 'Прошло:' : '' : i == 0 ? lnObj.activeTimeCurrent[language] : lnObj.activeTime[language]

        return Moment(recordsFiltered[i].dateTimeEnd).format('DD.MM.YYYY') == '01.01.1900' ? '' : `${activeDateTime} ${daysDiff} ${hoursDiff} ${minutesDiff}`
    }

    const findDifferenceSleep = (dateTime, dateTimeEnd) => {
        let a = Moment(dateTime)
        let b = dateTimeEnd == null ? Moment(nowDateTime) : Moment(dateTimeEnd)
        let c = Moment.duration(b.diff(a))
        return dateTimeEnd == null ? `${c.hours()}${lnObj.hours[language].substring(0, 1)}. ${c.minutes()}${lnObj.minutes[language].substring(0, 3)}.` : `${lnObj.sleepMainHeader[language]}: ${c.hours()}${lnObj.hours[language].substring(0, 1)}. ${c.minutes()}${lnObj.minutes[language].substring(0, 3)}.`
    }

    const editRecord = (attr1, dateTime, dateTimeEnd, name, recordId, scheduleId, type) => {
        setActiveAttr1(attr1)
        setActiveDateTime(dateTime)
        setActiveDateTimeEnd(dateTimeEnd)
        setActiveName(name)
        setActiveRecordId(recordId)
        setActiveScheduleId(scheduleId)
        setActiveType(type)
        setChangeType('edit')
        dispatch(setBottomRecordSheetVisible(true))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <SafeAreaView style={[{ backgroundColor: '#f5f5f5' },themeStyles.backgroundColor]}>
                <View style={mainStyles.screenContainer}>
                    <HeaderComponent userId={userId} navigation={navigation} child={child}></HeaderComponent>
                    <View style={mainStyles.headingTextBlock}>
                        <Text style={[mainStyles.h2_notBold]}>{activeType == 'feeding' ? lnObj.feedingMainHeader[language] : lnObj.sleepMainHeader[language]}</Text>
                    </View>
                    <ScrollView style={mainStyles.mainScrollView}>
                        {[
                            recordsFiltered.map((element, i, array) => {
                                if (activeType == 'feeding') {
                                    return (
                                        <View key={i} style={mainStyles.recordRow}>
                                            <View style={[
                                                i == 0 && Moment(element.dateTime).format('DD.MM.YYYY') == Moment(new Date()).format('DD.MM.YYYY') ? '' :
                                                    i > 0 && Moment(element.dateTime).format('DD.MM.YYYY') != Moment(array[i - 1].dateTime).format('DD.MM.YYYY') ? { marginBottom: 10 } : { display: 'none' }
                                                , mainStyles.countDayMain]}>
                                                <View style={mainStyles.countDayMainLine}></View>
                                                <Text style={[mainStyles.text, mainStyles.countDayMainText]}>
                                                    {i == 0 && Moment(element.dateTime).format('DD.MM.YYYY') == Moment(new Date()).format('DD.MM.YYYY') ? lnObj.todayText[language] :
                                                        i > 0 && Moment(element.dateTime).format('DD.MM.YYYY') != Moment(array[i - 1].dateTime).format('DD.MM.YYYY') ? Moment(element.dateTime).format('DD.MM.YYYY') : ''
                                                    }
                                                </Text>
                                            </View>
                                            <TimeCheckBlock type={'feeding'} timePass={findDiffRecordsDates(i)} index={i} ></TimeCheckBlock>
                                            <TouchableOpacity style={mainStyles.recordBlockWrapper} onPress={() => { editRecord(element.attr1, element.dateTime, element.dateTimeEnd, element.name, element.recordId, element.scheduleId, element.type) }}>

                                                <View style={mainStyles.col}>
                                                    <View style={mainStyles.recordTextPartHolder}>
                                                        <View style={Moment(element.dateTime).format('DD.MM.YYYY') == Moment(new Date()).format('DD.MM.YYYY') ? mainStyles.rtpIcon : mainStyles.rtpIconPast}>
                                                            <Icon
                                                                name='fast-food-outline'
                                                                type='ionicon'
                                                                color='#fff'
                                                            />
                                                        </View>
                                                        <View style={mainStyles.rtpText}>
                                                            <Text style={[mainStyles.rtpTextName, mainStyles.text]}>{element.name}</Text>
                                                            <Text style={[mainStyles.text, mainStyles.rtpTextDate]}>{Moment(element.dateTime).format('DD.MM.YYYY')}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={mainStyles.col}>
                                                    <View style={mainStyles.recordTime}>
                                                        <Text style={[mainStyles.recordTimeText, mainStyles.text]}>{Moment(element.dateTime).format('HH:mm')}</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View key={i} style={mainStyles.recordRow}>
                                            <TimeCheckBlock type={'sleep'} timePass={findDiffRecordsDates(i)} index={i} ></TimeCheckBlock>
                                            <TouchableOpacity style={mainStyles.recordBlockSleepWrapper} onPress={() => { editRecord(element.attr1, element.dateTime, element.dateTimeEnd, element.name, element.recordId, element.scheduleId, element.type) }}>
                                                <View style={mainStyles.recordBlockWrapperSleep}>
                                                    <View style={mainStyles.col}>
                                                        <View style={mainStyles.recordTextPartHolder}>
                                                            <View style={Moment(element.dateTime).format('DD.MM.YYYY') == Moment(new Date()).format('DD.MM.YYYY') ? mainStyles.rtpIcon : mainStyles.rtpIconPast}>
                                                                <Icon
                                                                    name='moon-outline'
                                                                    type='ionicon'
                                                                    color='#fff'
                                                                />
                                                            </View>
                                                            <View style={mainStyles.rtpText}>
                                                                <Text style={[mainStyles.rtpTextName, mainStyles.text]}>{element.name}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={[mainStyles.row, mainStyles.sleepRow]}>
                                                    <View style={mainStyles.col}>
                                                        <View style={mainStyles.recordTime}>
                                                            <Text style={[mainStyles.text, mainStyles.recordTimeTextSleep]}>{Moment(element.dateTime).format('HH:mm')}</Text>
                                                            <Text style={[mainStyles.text, mainStyles.rtpTextDate]}>{Moment(element.dateTime).format('DD.MM.YYYY')}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[mainStyles.col]}>
                                                        <View style={mainStyles.sleepRecordDurationDiv}></View>
                                                        <View style={[mainStyles.sleepCol]}>
                                                            <Text style={[mainStyles.sleepColText]}>{element.dateTimeEnd != '1900-01-01' ? findDifferenceSleep(element.dateTime, element.dateTimeEnd) : `Сон идет ${findDifferenceSleep(element.dateTime, null)}`}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={mainStyles.col}>
                                                        {element.dateTimeEnd != '1900-01-01' ?
                                                            <View style={mainStyles.recordTime}>
                                                                <Text style={[mainStyles.text, mainStyles.recordTimeTextSleep]}>{Moment(element.dateTimeEnd).format('HH:mm')}</Text>
                                                                <Text style={[mainStyles.text, mainStyles.rtpTextDate]}>{Moment(element.dateTimeEnd).format('DD.MM.YYYY')}</Text>
                                                            </View>
                                                            :
                                                            <View style={{ marginHorizontal: 20 }}>
                                                                <Icon
                                                                    name='time-outline'
                                                                    type='ionicon'
                                                                    color='#d3d3d3'
                                                                    size={30}
                                                                />
                                                            </View>

                                                        }

                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            })
                        ]}
                    </ScrollView>
                    <View style={mainStyles.bottomMenuHolder}>
                        <View style={mainStyles.bottomMenu}>
                            <View style={mainStyles.col}>
                                <TouchableOpacity onPress={() => { setActiveType('feeding') }} style={[mainStyles.bottomMeuButton, mainStyles.bm_feeding, activeType == 'feeding' ? mainStyles.activeMenuButton : '']}>
                                    <Icon
                                        name='fast-food-outline'
                                        type='ionicon'
                                        color={activeType == 'feeding' ? '#fff' : '#5379FF'}
                                    />
                                </TouchableOpacity>
                                <Text style={[mainStyles.text, mainStyles.bottomMenuText]}>{lnObj.meal[language]}</Text>
                            </View>
                            <View style={mainStyles.col}>
                                <TouchableOpacity onPress={() => { setIsVisible(true), setChangeType('add') }} style={[mainStyles.bottomMeuButton, mainStyles.addRecordButton]}>
                                    <Icon
                                        name='add-circle-outline'
                                        style={{ marginRight: -1 }}
                                        type='ionicon'
                                        color='#fff'
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={mainStyles.col}>
                                <TouchableOpacity onPress={() => { setActiveType('sleep') }} style={[mainStyles.bottomMeuButton, mainStyles.bm_sleep, activeType == 'sleep' ? mainStyles.activeMenuButton : '']}>
                                    <Icon
                                        name='moon-outline'
                                        type='ionicon'
                                        color={activeType == 'sleep' ? '#fff' : '#5379FF'}
                                    />
                                </TouchableOpacity>
                                <Text style={[mainStyles.text, mainStyles.bottomMenuText]}>{lnObj.dream[language]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <BottomSheetRecord activeAttr1={activeAttr1} activeDateTime={activeDateTime} activeDateTimeEnd={activeDateTimeEnd} activeName={activeName} activeRecordId={activeRecordId} activeScheduleId={activeScheduleId} type={changeType} activeType={activeType} childId={child[0].childrenID} nowActiveDateTime={new Date()} userIdStored={userId} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}