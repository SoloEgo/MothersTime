import { View } from 'react-native';
import { checkboxStyles } from '../assets/styles/checkbox';
import { Icon } from 'react-native-elements'

export default function CheckBox(props) {
    const checked = props.isChecked

    return (
        <View style={checkboxStyles.mainWrapper}>
            {checked ?
                <View style={checkboxStyles.checkedBox}>
                    <Icon
                        name='checkmark-outline'
                        type='ionicon'
                        color='#fff'
                        size={20}
                    />
                </View>
                :
                <View style={checkboxStyles.uncheckedBox}>
                    
                </View>}
        </View>
    )
}