import { StyleSheet, Platform, StatusBar } from 'react-native';

const mainStyles = StyleSheet.create({

    mainContainer:{
        fontFamily: 'Inter-Black',
        backgroundColor: '#ffffff',
    },

    container: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    
    header: {
        paddingTop: 20,
        paddingBottom: 20
    },

    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    h1: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 25,
    },

    h2: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 20,
    },

    h3: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 18,
    },

    h4: {
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        fontSize: 16,
    },

    text:{
        fontFamily: 'Inter-Regular',
    },

    t_center: {
        textAlign: 'center'
    },
    t_left: {
        textAlign: 'left'
    },
    t_right: {
        textAlign: 'right'
    },
    textWhite:{
        color: '#fff'
    },

    textInputWrapper: {
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#f4f5fc',
        borderRadius: 10,
        padding: 15
    },

    textSelectWrapper: {
        backgroundColor: '#f4f5fc',
        borderRadius: 10,
        padding: Platform.OS === "android" ? 0 : 15
    },

    textInput: {
        width: '100%',
        fontSize: 16,
    },

    mainButton: {
        borderRadius: 10,
        fontSize: 16,
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingTop: '5%',
        paddingBottom: '5%',
        backgroundColor: '#5379FF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },

})

export { mainStyles }