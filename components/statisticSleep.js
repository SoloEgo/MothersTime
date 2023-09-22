import { Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import { themeStyles } from '../assets/styles/themeStyles';
import Moment from 'moment';
import { Icon } from 'react-native-elements'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lnObj } from '../constants/language';
import HeaderImage from './headerImage';
import themeChecker from '../components/themeChecker'

export default function StatisticSleep(props) {
    const [popupActive, setPopupActive] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const child = props.child

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    useEffect(() => {
        setButtonDisabled(false)
    }, [])

    const goToSettings = () => {
        if (buttonDisabled) {
            return
        }
        setButtonDisabled(true)
        props.navigation.push('Settings')
        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000);
    }

    const goToStatistics = () => {
        if (buttonDisabled) {
            return
        }
        setButtonDisabled(true)
        props.navigation.push('Statistic')
        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000);
    }

    return (
        <View style={[mainStyles.headerBlock, themeStyles.backgroundColorDark]}>
            <View style={mainStyles.headerUserCol}>
                <View style={mainStyles.col}>
                    <Pressable style={mainStyles.headerUserProfile} onPress={() => { setPopupActive(true) }}>
                        <HeaderImage image={child[0].photo} name={child[0].name}></HeaderImage>
                        <View style={mainStyles.userNameHolder}>
                            <View style={mainStyles.mainUserName}>
                                <Text style={[mainStyles.headerUserName, mainStyles.text]}>{child[0].name}</Text>
                            </View>
                            <View style={[mainStyles.subUserInfo]}>
                                <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{child[0].gender == 'female' ? lnObj.female[language] : lnObj.male[language]}, </Text>
                                <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{Moment().diff(child[0].dob, 'years') <= 3 ? `${Moment().diff(child[0].dob, 'years')}${lnObj.yearsOld[language]} ${(Moment().diff(child[0].dob, 'months') % 12)}${lnObj.monthsOld[language]}` : `${Moment().diff(child[0].dob, 'years')} ${lnObj.yearsOld[language]}`}</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={mainStyles.headerActionControl}>
                <View style={mainStyles.col}>
                    <TouchableOpacity onPressOut={() => {
                        goToStatistics(true)
                    }} style={[mainStyles.settingButton, mainStyles.headerControlButton]}>
                        <Icon
                            name='bar-chart-outline'
                            type='ionicon'
                            color={themeChecker == 'light' ? '#3e3e3e' : '#ffffff'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={mainStyles.col}>
                    <TouchableOpacity onPressOut={() => {
                        goToSettings(true)
                    }} style={[mainStyles.settingButton, mainStyles.headerControlButton]}>
                        <Icon
                            name='settings-outline'
                            type='ionicon'
                            color={themeChecker == 'light' ? '#3e3e3e' : '#ffffff'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}