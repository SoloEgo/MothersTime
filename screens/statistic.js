import { useEffect, useState, useCallback } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Button } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import { themeStyles } from '../assets/styles/themeStyles';
import { Icon } from 'react-native-elements'
import Moment from 'moment';
import { lnObj } from '../constants/language';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../components/header';
import { statisticStyles } from '../assets/styles/statisticStyles';
import { DatePickerModal } from 'react-native-paper-dates';
import themeChecker from '../components/themeChecker'
import StatisticMeal from '../components/statisticMeal';

export default function Statistic({ navigation }) {
    const [activeType, setActiveType] = useState('feeding')
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = useState(false);
    const [filteredRecords, setFilteredRecords] = useState([])


    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
        },
        [setOpen, setRange]
    );
    const onActiveTypeChange = useEffect(() => {
        setStatData();
    }, [activeType]);

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    const userId = useSelector((state) => {
        return state.records.userId
    })

    const records = useSelector((state) => {
        return state.records.allRecords
    });

    const filterButtonPress = (activeType) => {
        setActiveType(activeType)
        setStatData()
    }

    const moveHome = () => {
        navigation.navigate('Home')
    }

    const setStatData = () => {
        setFilteredRecords(records.filter(item => item.type == activeType))
    }

    const schedulesRaw = useSelector((state) => {
        return state.records.allSchedules
    })

    let schedules = schedulesRaw.filter(item => item.type == activeType)

    const child = useSelector((state) => {
        return state.records.activeChild || [{ "childrenID": 1, "dob": "", "gender": "", "name": "", "photo": "", "userId": "" }]
    });

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <SafeAreaView style={[themeStyles.backgroundColorDark]}>
                <View style={mainStyles.screenContainer}>
                    <HeaderComponent userId={userId} navigation={navigation} child={child}></HeaderComponent>
                    <View style={statisticStyles.container}>
                        <View style={[statisticStyles.headingTextBlock, mainStyles.row]}>
                            <Text style={[mainStyles.h2_notBold, mainStyles.text]}>Статистика</Text>
                            <View>
                                <TouchableOpacity onPress={() => { moveHome() }} style={statisticStyles.closeButton}>
                                    <Icon
                                        name='close-outline'
                                        type='ionicon'
                                        color='#3e3e3e'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={statisticStyles.headingFilter}>
                            <View style={[mainStyles.row, statisticStyles.rowButtons]}>
                                <View style={mainStyles.col}>
                                    <View style={mainStyles.row}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                filterButtonPress('feeding')
                                            }}
                                            style={[statisticStyles.filterButton, statisticStyles.fbLeft, activeType == 'feeding' ? statisticStyles.filterButtonActive : '']}
                                        >
                                            <Text style={[mainStyles.text, activeType == 'feeding' ? statisticStyles.filterButtonActiveText : '']}>{lnObj.meal[language]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                filterButtonPress('sleep')
                                            }}
                                            style={[statisticStyles.filterButton, statisticStyles.fbRight, activeType == 'sleep' ? statisticStyles.filterButtonActive : '']}
                                        >
                                            <Text style={[mainStyles.text, activeType == 'sleep' ? statisticStyles.filterButtonActiveText : '']}>{lnObj.sleep[language]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={mainStyles.col}>
                                    <View style={mainStyles.row}>
                                        <View style={mainStyles.col}>
                                            <Text>{Moment(range.startDate).format('DD.MM.YYYY')} - {Moment(range.endDate).format('DD.MM.YYYY')}</Text>
                                        </View>
                                        <View style={mainStyles.col}>
                                            <Pressable onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                                                <Icon
                                                    name='calendar-outline'
                                                    type='ionicon'
                                                    color={themeChecker == 'dark' ? '#fff' : '#3e3e3e'}
                                                />
                                            </Pressable>
                                            <DatePickerModal
                                                locale="ru"
                                                mode="range"
                                                saveLabel="Выбрать"
                                                presentationStyle={'pageSheet'}
                                                visible={open}
                                                onDismiss={onDismiss}
                                                startDate={range.startDate}
                                                endDate={range.endDate}
                                                onConfirm={onConfirm}
                                                selectColor={"5379FF"}
                                            />
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <ScrollView style={mainStyles.scrollViewMain}>
                            <StatisticMeal records={filteredRecords} schedule={schedules}></StatisticMeal>
                        </ScrollView>

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}