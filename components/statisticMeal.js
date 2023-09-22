import { Text, View, Pressable, ActionSheetIOS, TouchableOpacity } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import { themeStyles } from '../assets/styles/themeStyles';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { lnObj } from '../constants/language';
import { BarChart } from "react-native-gifted-charts";
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { Picker } from '@react-native-picker/picker';

export default function StatisticMeal(props) {
    const [popupActive, setPopupActive] = useState(false);
    const [chosenType, setChosenType] = useState(false);
    const records = props.records
    const schedule = props.schedule

    const [recordName, setRecordName] = useState()

    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', ...schedule.map(i => i.name)],
                //destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark',
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else {
                    setRecordName(schedule[buttonIndex - 1].name);
                }
            },
        );
    }

    let totalDiff = 0
    records.forEach((item, index, arr) => {
        item.timeDiff = index == 0 ? 0 : (Moment(item.dateTimeEnd)).diff(Moment(arr[index - 1].dateTimeEnd))
        item.time = parseInt(Moment(item.dateTimeEnd).format('HH')) + parseInt(Moment(item.dateTimeEnd).format('mm'))
        totalDiff += item.timeDiff
    });

    useEffect(() => {
        if (schedule.length > 0) {
            setRecordName(schedule[0].name)
        }
    })

    totalDiff = totalDiff / (records.length - 1)
    totalDiff = Moment.duration(totalDiff)

    console.log(records)
    console.log(schedule)

    const barData = [
        { value: 250, label: 'M' },
        { value: 500, label: 'T', frontColor: '#177AD5' },
        { value: 745, label: 'W', frontColor: '#177AD5' },
        { value: 320, label: 'T' },
        { value: 600, label: 'F', frontColor: '#177AD5' },
        { value: 256, label: 'S' },
        { value: 300, label: 'S' },
    ];

    return (
        <View style={[]}>
            <View>
                <Text style={[mainStyles.text, { fontSize: 25, marginTop: 10, marginBottom: 20 }]}>Ср. время между приемами пищи: {totalDiff.hours()} часа</Text>
            </View>
            <View style={[bottomSheetStyles.childFormInputsBlock_1]}>
                {Platform.OS === 'android' ?
                    <View>
                        <View style={[mainStyles.textSelectWrapper, themeStyles.backgroundColorDark]}>
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
                    <Pressable onPress={showActionSheet} style={[setUpStyles.genderPresSheet, themeStyles.backgroundColorLightDark]}>
                        <Text style={[setUpStyles.genderPresSheetText, mainStyles.text]}>{recordName}</Text>
                    </Pressable>
                }
            </View>
            <View>
                <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                />
            </View>
        </View>
    )
}