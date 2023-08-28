import { Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';
import Moment from 'moment';
import { Icon } from 'react-native-elements'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lnObj } from '../constants/language';

export default function HeaderComponent(props) {
    const [popupActive, setPopupActive] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const child = props.child

    const dispatch = useDispatch();

    const language = useSelector((state) => {
        return state.records.locale
    });

    useEffect(()=>{
        setButtonDisabled(false)
    },[])

    const goToSettings = () => {
        if(buttonDisabled){
            return
        }
        setButtonDisabled(true)
        props.navigation.push('Settings')
        setTimeout(() => {
            setButtonDisabled(false)
        }, 1000);
    }

    return (
        <View style={mainStyles.headerBlock}>
            <View style={mainStyles.headerUserCol}>
                <View style={mainStyles.col}>
                    <Pressable style={mainStyles.headerUserProfile} onPress={() => { setPopupActive(true) }}>
                        <View style={mainStyles.headerUserPhoto}>
                            <Image style={mainStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + child[0].photo }} />
                        </View>
                        <View style={mainStyles.userNameHolder}>
                            <View style={mainStyles.mainUserName}>
                                <Text style={[mainStyles.headerUserName, mainStyles.text]}>{child[0].name}</Text>
                            </View>
                            <View style={[mainStyles.subUserInfo]}>
                                <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{child[0].gender == 'female' ? lnObj.female[language] : lnObj.male[language] }, </Text>
                                <Text style={[mainStyles.subUserInfoText, mainStyles.text]}>{Moment().diff(child[0].dob, 'years') == 0 ? Moment().diff(child[0].dob, 'months') : Moment().diff(child[0].dob, 'years')} {lnObj.yearsOld[language]}</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={mainStyles.headerActionControl}>
                <View style={mainStyles.col}>
                    <TouchableOpacity onPressOut={() => { 
                        goToSettings(true) 
                        }} style={[mainStyles.settingButton, mainStyles.headerControlButton]}>
                        <Icon
                            name='settings-outline'
                            type='ionicon'
                            color='#3e3e3e'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}