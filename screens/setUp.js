import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Image, Alert, TextInput, Button } from 'react-native';
import { setUpStyles } from '../assets/styles/setUpStyles';
import { mainStyles } from '../assets/styles/mainStyles';
import { Icon, Input } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
//import DateTimePicker from '@react-native-community/datetimepicker';


export default function SetUp(navigateion) {
    const [isSecondStep, setSecondStep] = useState(false)
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [gender, setGender] = useState('');
    const [childName, setChildName] = useState('')
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const showPhotoAlert = () => {
        Alert.alert(
            'Photo',
            'Take a photo or choose one from gallery',
            [
                { text: 'Photo', onPress: () => openCamera() },
                { text: 'Gallery', onPress: () => pickImage() },
            ],
            { cancelable: true }
        );
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].base64);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].base64);
        }
    };

    useEffect(() => {
        console.log('setUp')
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <SafeAreaView>
                {!isSecondStep ?
                    <View style={setUpStyles.container}>
                        <View style={mainStyles.header}>
                            <Text style={mainStyles.h1}>Let's complete profile!</Text>
                            <Text style={[mainStyles.text, mainStyles.t_center]}>It will make using this app much easier</Text>
                        </View>
                        <View style={setUpStyles.childForm}>
                            <View style={setUpStyles.childFormInputs}>
                                <Pressable style={setUpStyles.childPhotoContainer} onPress={showPhotoAlert}>
                                    <View style={setUpStyles.imageContainer}>
                                        {pickedImagePath !== '' ?
                                            <View style={setUpStyles.imageContainerChanger}>
                                                <Image style={setUpStyles.childPhotoImage} source={{ uri: 'data:image/jpeg;base64,' + pickedImagePath }} />
                                                <View style={setUpStyles.childPhotoIconChange}>
                                                    <Icon
                                                        name='camera-outline'
                                                        type='ionicon'
                                                        color='#fff'
                                                        size={30}
                                                    />
                                                </View>
                                            </View>
                                            :
                                            <View style={setUpStyles.childPhotoIconBlock}>
                                                <Icon
                                                    name='camera-outline'
                                                    type='ionicon'
                                                    color='#d3d3d3'
                                                    size={50}
                                                    style={setUpStyles.childPhotoIcon}
                                                />
                                                <Text style={[mainStyles.text, mainStyles.t_center, mainStyles.h4]}>Add photo</Text>
                                            </View>
                                        }
                                    </View>
                                </Pressable>
                                <View style={setUpStyles.childFormInputsBlock}>
                                    <View style={setUpStyles.childFormInputsLabel}>
                                        <Text style={[mainStyles.text, setUpStyles.childFormInputsLabelText]}>Child's gender:</Text>
                                    </View>
                                    {/* <View style={[mainStyles.textSelectWrapper, setUpStyles.textInWrap]}> */}
                                        <Picker
                                            selectedValue={gender}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setGender(itemValue)
                                            }>
                                            <Picker.Item label="Male" value="male" />
                                            <Picker.Item label="Female" value="female" />
                                        </Picker>
                                    {/* </View> */}
                                </View>
                                <View style={setUpStyles.childFormInputsBlock}>
                                    <View style={setUpStyles.childFormInputsLabel}>
                                        <Text style={setUpStyles.childFormInputsLabelText}>Child's name</Text>
                                    </View>
                                    <View style={[mainStyles.textInputWrapper, setUpStyles.textInWrap]}>
                                        <TextInput
                                            style={mainStyles.textInput}
                                            value={childName}
                                            onChangeText={(value) => { setChildName(value) }}
                                        ></TextInput>
                                    </View>
                                </View>
                                <View style={setUpStyles.childFormInputsBlock}>
                                    <View style={setUpStyles.childFormInputsLabel}>
                                        <Text style={setUpStyles.childFormInputsLabelText}>Child's birth date</Text>
                                    </View>
                                    <View style={[mainStyles.textInputWrapper, setUpStyles.textInWrap]}>

                                    </View>
                                </View>
                            </View>
                            <Button
                                testID="showPickerButton"
                                onPress={() => {
                                    setShow(true);
                                }}
                                title="Show picker!"
                            />
                            {Platform.OS === 'android' ?
                                <View>
                                    <Pressable><Text>selected: {date.toLocaleString()}</Text></Pressable>
                                    {show && (
                                        <></>
                                        // <DateTimePicker
                                        //     testID="dateTimePicker"
                                        //     value={date}
                                        //     mode={mode}
                                        //     is24Hour={true}
                                        //     onChange={onChange}
                                        // />
                                    )}
                                </View>
                                :
                                <></>
                                // <DateTimePicker
                                //     testID="dateTimePicker"
                                //     value={date}
                                //     mode={mode}
                                //     is24Hour={true}
                                //     onChange={onChange}
                                // />
                            }
                            <View style={setUpStyles.childFormConfirm}>
                                <Pressable style={mainStyles.mainButton}><Text style={[mainStyles.text, mainStyles.t_center, mainStyles.h4, mainStyles.textWhite]}>Continue</Text></Pressable>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={setUpStyles.container}>
                        <View style={setUpStyles.setUpBlock}>
                            <View style={setUpStyles.setUpHeader}>
                                <View style={setUpStyles.row}>
                                    <Text style={setUpStyles.setUpHeaderText}>Feeding</Text>
                                    <Pressable style={setUpStyles.plusBtn}>
                                        <Icon
                                            name='add-outline'
                                            type='ionicon'
                                            color='#d3d3d3'
                                            style={setUpStyles.signUpFormIcon}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={setUpStyles.setUpContentWrapper}>
                                <ScrollView style={setUpStyles.setUpContentSlider}
                                    //pagingEnabled={true}
                                    horizontal={true}
                                    decelerationRate='fast'
                                    snapToAlignment={"left"}
                                    centerContent={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignItems: 'flex-start',
                                        padding: 10,
                                    }}
                                >
                                    <View style={setUpStyles.setUpCard}>
                                        <Text>React native</Text>
                                    </View>
                                    <View style={setUpStyles.setUpCard}>
                                        <Text>React native</Text>
                                    </View>
                                    <View style={setUpStyles.setUpCard}>
                                        <Text>React native</Text>
                                    </View>
                                    <View style={setUpStyles.setUpCard}>
                                        <Text>React native</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>}

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}