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
        top: -100,
        left: 0,
        width: '100%',
        height: '200%',
        opacity: 0.15,
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
        paddingVertical: 40,
        paddingHorizontal: 20
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20
    },
    
    textInputWrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFF0',
        borderRadius: 10,
        maxWidth: "70%"
    },

    inputLabelRow: {
        fontSize: 16,
        paddingVertical: Platform.OS === "android" ? 5 : 10,
        width: '30%'
    },

    childFormInputsBlock_1: {
        width: '50%',
    },

    sleepTimeBlock: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 10,
        marginBottom: 20
    }, 

    todayText: {
        color: "#d3d3d3"
    }
})

export { bottomSheetStyles }