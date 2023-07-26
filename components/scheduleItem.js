import { useEffect, useState } from 'react';
import { Text, View, Pressable, TextInput, Platform, Keyboard } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { bottomSheetStyles } from '../assets/styles/bottomSheetStyles';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { lnObj } from '../constants/language';
import { addSchedule, setBottomSheetVisible, removeSchedule } from '../store/actions/records';
import { Icon } from 'react-native-elements'

export default function ScheduleItem(props) {
    return (
        <View key={props.scheduleId} style={setUpStyles.setUpCard}>
            <View style={setUpStyles.setUpCardTitle}>
                <Text style={setUpStyles.setUpCardName}>{props.name}</Text>
            </View>
            <View style={setUpStyles.setUpCardRow}>
                <View style={setUpStyles.setUpCardIcon}>
                    {props.type != 'sleep' ?
                        <Icon
                            name='alarm-outline'
                            type='ionicon'
                            color='#fff'
                            size={20}
                        />
                        :
                        <Icon
                            name='moon-outline'
                            type='ionicon'
                            color='#fff'
                            size={20}
                        />
                    }
                </View>
                <View style={setUpStyles.setUpCardTextHolder}><Text style={setUpStyles.setUpCardText}>{Moment(props.time).format('HH:mm')}</Text></View>
            </View>
        </View>
    )
}