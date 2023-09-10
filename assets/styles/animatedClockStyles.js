import { StyleSheet, Platform, StatusBar } from 'react-native';

const animatedClockStyles = StyleSheet.create({
    wrapper: {flex: 1},
    clockCircle: {
        aspectRatio: '1/1',
        width: 15,
        borderWidth: 1.5,
        borderColor: '#d3d3d3',
        //borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow: {
        position: 'absolute',
        width: 5,
        height: 1.5,
        backgroundColor: '#d3d3d3',
        left: '50%'
    },
    arrowHour: {
        position: 'absolute',
        width: 5,
        height: 1.5,
        backgroundColor: '#d3d3d3',
        left: '0%'
    }

})

export { animatedClockStyles }