import { StyleSheet, Platform, StatusBar } from 'react-native';
import themeChecker from '../../components/themeChecker'
const statisticStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        backgroundColor: themeChecker == 'dark' ? '#3e3e3e' : '#ffffff',
        marginTop:10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 20,
        elevation: 3
    },

    headingFilter: {
        marginVertical: 15
    },

    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#5379FF'
    },

    filterButtonActive: {
        backgroundColor: '#5379FF',
    },

    fbLeft: {
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100
    },

    fbRight: {
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100
    },

    filterButtonActiveText: {
        color: '#fff'
    },

    rowButtons:{
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },

    closeButton: {
        padding: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 10
    },

    headingTextBlock: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export { statisticStyles }