import { useEffect, useState } from 'react';
import { Text, View, Animated } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import { Icon } from 'react-native-elements'
import { lnObj } from '../constants/language';
import { useDispatch, useSelector } from 'react-redux';

export default function TimeCheckBlock(props) {
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('')
    const status = props.status
    const timePass = props.timePass
    const type = props.type
    const index = props.index
    const spinValue = new Animated.Value(0);
    const rotate = spinValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','360deg']
    })
    useEffect(() => {
        if (status == 'good') {
            setIcon('checkmark-circle-outline')
            setColor('#4CAF50')
        }
        if (status == 'neutral') {
            setIcon('stop-circle-outline')
            setColor('#FFC107')
        }
        if (status == 'bad') {
            setIcon('close-circle-outline')
            setColor('#E53935')
        }
    })

    const language = useSelector((state) => {
        return state.records.locale
    });

    const findDiffRecordsStatusText = (status) => {
        if (!status) {
            return '|'
        }
        return lnObj.recordsStatusText[status][language]
    }

    return (
        <View style={mainStyles.timeCheckBlock}>
            <View style={mainStyles.timeCheckBlockWrappers}>
                {timePass ?
                    <View style={mainStyles.tcb_pill}>
                        <View style={[mainStyles.tcb_timePass, mainStyles.row]}>
                            <Icon
                                name={ type == 'feeding' ? index == 0 ? 'time-outline' : 'checkmark-circle-outline' : 'accessibility'}
                                type={ type == 'feeding' ? 'ionicon' : 'octicon'}
                                color='#d3d3d3'
                                size={ type == 'feeding' ? 20 : 15 }
                                style={{marginRight: 5}}
                            />
                            <Text style={[mainStyles.text, mainStyles.tcb_TextDate]}>
                                {timePass}
                            </Text>
                        </View>
                    </View>
                    : ''}
            </View>
        </View>
    )
}