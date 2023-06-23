import { StyleSheet, Platform, StatusBar } from 'react-native';

const mainStyles = StyleSheet.create({

    mainContainer: {
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
        marginBottom: 5
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

    p: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
    },

    text: {
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
    textWhite: {
        color: '#fff'
    },

    textInputWrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#EFEFF0',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },

    textSelectWrapper: {
        backgroundColor: '#EFEFF0',
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
        paddingTop: '4%',
        paddingBottom: '4%',
        backgroundColor: '#5379FF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },

    mainButtonText: {
        color: '#fff',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 14,
    },

    inputLabel: {
        marginBottom: 10
    },

    inputLabelText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },

    childInfoWrapper: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    headerPhotoChild: {
        width: "15%",
        aspectRatio: '1/1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginRight: 10
    },

    childPhotoImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 100
    },

    headerNameChildText: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
    },

    headerAgeChildText: {
        color: '#3e3e3e'
    },

    mainPlusBtn: {
        backgroundColor: '#5379FF',
        marginLeft: 10,
        marginRight: 10,
        aspectRatio: '1/1',
        borderRadius: 5,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export { mainStyles }