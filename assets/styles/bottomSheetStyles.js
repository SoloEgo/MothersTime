import { StyleSheet } from 'react-native';

const bottomSheetStyles = StyleSheet.create({
    wrapper:{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 100
    },

    blackBlock: {
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        zIndex: 10
    },

    whiteBlock: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: '100%',
        minHeight: '50%',
        flex: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 150
    },

    ScrollView: {
        padding: 20
    },
})

export { bottomSheetStyles }