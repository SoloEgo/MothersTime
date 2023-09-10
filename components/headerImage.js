import { View, Image, Text } from 'react-native';
import { mainStyles } from '../assets/styles/mainStyles';

export default function HeaderImage(props) {
    const image = props.image
    const name = props.name.substring(0,1)

    return (
        <View style={mainStyles.headerUserPhoto}>
            {image.length > 1 ?
            <Image style={mainStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + image }} />
            :
            <View style={mainStyles.childPhotoText}>
                <Text style={[mainStyles.text, mainStyles.childPhotoText_text]}>{name}</Text>
            </View>
            }
            
        </View>
    )
}