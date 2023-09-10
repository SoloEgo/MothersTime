import { StyleSheet, Platform, StatusBar } from 'react-native';

const checkboxStyles = StyleSheet.create({
    mainWrapper:{
        marginLeft: 10
    },
    checkedBox: {
        backgroundColor: '#5379FF',
        borderWidth: 2,
        borderColor: '#5379FF',
        borderRadius: 5,
        padding: 1
    },
    uncheckedBox: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#d3d3d3',
        aspectRatio: '1/1',
        padding: 12,
        borderRadius: 5,
    }
})

export { checkboxStyles }