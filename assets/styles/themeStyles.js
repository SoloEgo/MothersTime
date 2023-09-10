import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Appearance, useColorScheme } from 'react-native';


const themeStyles = StyleSheet.create({

    background: {
        backgroundColor: '#3e3e3e',
    },

    // colorTextLight: {
    //     color: '#3e3e3e'
    // },

    // colorTextWhite: {
    //     color: '#fff'
    // },

    // textInputBackgroundLight: {
    //     backgroundColor: '#EFEFF0'
    // },

    // mainButtonLight: {
    //     backgroundColor: '#5379FF',
    //     borderColor: '#5379FF'
    // },

    // mainButtonDeleteLight: {
    //     borderColor: '#E53935'
    // },

    // disabledMainButtonLight: {
    //     borderColor: '#d0d0d0',
    //     backgroundColor: '#d3d3d3'
    // },

    // mainButtonTextLight: {
    //     color: '#fff'
    // },

    // mainButtonDeleteTextLight: {
    //     color: '#E53935'
    // },

    // inputLabelTextSleepLight: {
    //     backgroundColor: '#fff',
    // },

    // mainPlusBtnLight: {
    //     backgroundColor: '#5379FF'
    // },

    // headerBlockLight: {
    //     backgroundColor: '#f5f5f5'
    // },

    // subUserInfoTextLight: {
    //     color: '#ADADAD'
    // },

    // mainScrollViewLight: {
    //     backgroundColor: "#f5f5f5"
    // },

    // bottomMenuHolderLight: {
    //     backgroundColor: '#fff'
    // },

    // bm_feedingLight: {
    //     borderColor: '#5379FF'
    // },

    // bm_sleepLight: {
    //     borderColor: '#5379FF'
    // },

    // activeMenuButtonLight: {
    //     backgroundColor: '#5379FF',
    // },

    // addRecordButtonLight: {
    //     backgroundColor: '#FF5995',
    //     borderColor: '#FF5995',
    // },

    // bottomMenuText: { 
    //     textAlign: 'center', 
    //     fontSize: 12, 
    //     color: '#5379FF' 
    // },

    // bottomMenuTextAdd: { 
    //     textAlign: 'center', 
    //     fontSize: 12, 
    //     color: '#FF5995' 
    // },

    // recordRow: {
    //     //marginBottom: 10
    // },

    // recordBlockWrapper: {
    //     backgroundColor: "#fff",
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     paddingVertical: 4,
    //     paddingHorizontal: 10,
    //     borderRadius: 17,
    //     marginVertical: 15,
    //     marginHorizontal: 5,
    //     elevation: 1,
    //     shadowColor: '#000',
    //     shadowRadius: 1,
    //     shadowOffset: {
    //         width: 0,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.1,
    // },

    // recordBlockWrapperSleep: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     paddingVertical: 5,

    // },

    // recordBlockSleepWrapper: {
    //     backgroundColor: "#fff",
    //     //flexDirection: 'row',
    //     //alignItems: 'center',
    //     //justifyContent: 'space-between',
    //     paddingVertical: 5,
    //     paddingHorizontal: 10,
    //     borderRadius: 15,
    //     marginVertical: 15,
    //     elevation: 1,
    //     shadowColor: '#000',
    //     shadowRadius: 1,
    //     shadowOffset: {
    //         width: 0,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.1,
    // },

    // recordTextPartHolder: {
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },

    // rtpIcon: {
    //     backgroundColor: '#FF5995',
    //     aspectRatio: '1/1',
    //     padding: 5,
    //     borderRadius: 10,
    //     marginEnd: 20
    // },
    // rtpIconPast: {
    //     backgroundColor: '#d3d3d3',
    //     aspectRatio: '1/1',
    //     padding: 5,
    //     borderRadius: 10,
    //     marginEnd: 20
    // },

    // rtpTextName: {
    //     fontSize: 20,
    //     //lineHeight: 25
    // },

    // rtpTextDate: {
    //     fontSize: 12,
    //     color: '#AAAAAA'
    // },

    // recordTimeText: {
    //     fontSize: 30
    // },

    // timeCheckBlock: {
    //     flex: 0,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    // tcb_pill: {
    //     backgroundColor: "#fff",
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 100
    // },

    // tcb_timePass: {
    //     alignItems: 'center',
    // },

    // tcb_TextDate: {
    //     color: '#AAAAAA'
    // },

    // preloaderView: {
    //     flex: 1,
    //     height: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     padding: 10,
    // },

    // sleepRow: {
    //     justifyContent: 'space-between'
    // },

    // recordTimeTextSleep: {
    //     fontSize: 25
    // },

    // recordTime: {
    //     textAlign: 'center'
    // },

    // sleepRecordDurationDiv: {
    //     width: '100%',
    //     height: 1,
    //     backgroundColor: '#d3d3d3',
    //     paddingHorizontal: 20,
    //     position: 'absolute',
    //     top: 10
    // },

    // sleepColText: {
    //     marginHorizontal: 25,
    //     paddingHorizontal: 5,
    //     backgroundColor: '#fff'
    // },

    // countDayMain: {
    //     justifyContent: 'center',
    //     marginTop: 20
    // },

    // countDayMainText: {
    //     textAlign: 'center',
    //     color: '#9E9E9E',
    //     marginTop: -10,
    //     backgroundColor: '#f5f5f5',
    //     paddingHorizontal: 5,
    //     alignSelf: 'flex-start',
    //     textTransform: 'capitalize'
    // },

    // countDayMainLine: {
    //     height: 1,
    //     backgroundColor: '#d3d3d3',
    // }

})

export { themeStyles }