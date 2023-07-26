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
        //flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    h1: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 5,
        color: '#3e3e3e'
    },

    h2: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 20,
        color: '#3e3e3e'
    },

    h3: {
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 18,
        color: '#3e3e3e'
    },

    h4: {
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        fontSize: 16,
        color: '#3e3e3e'
    },

    p: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#3e3e3e'
    },

    text: {
        fontFamily: 'Inter-Regular',
        color: '#3e3e3e'
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
        borderRadius: 10
    },

    textSelectWrapper: {
        backgroundColor: '#EFEFF0',
        borderRadius: 10,
        padding: Platform.OS === "android" ? 0 : 15
    },

    textInput: {
        width: '100%',
        fontSize: 16,
        paddingVertical: Platform.OS === "android" ? 5 : 10,
        paddingHorizontal: 15
    },

    mainButton: {
        borderRadius: 10,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#5379FF',
        borderColor: '#5379FF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },

    mainButtonDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#E53935',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },

    disabledMainButton: {
        borderColor: '#d0d0d0',
        borderWidth: 1,
        backgroundColor: '#d3d3d3'
    },

    mainButtonText: {
        color: '#fff',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 14,
    },

    mainButtonDeleteText: {
        color: '#E53935',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 5
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
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 26
    },

    screenContainer: {
        width: '100%',
        height: '100%',
        //backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 0 : 0
    },

    headerBlock: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f5f5f5'
    },

    headerUserCol: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    headerActionControl: {
        flexDirection: 'row'
    },

    headerUserProfile: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    childPhotoImage: {
        aspectRatio: '1/1',
        width: 50,
        marginRight: 10,
        borderRadius: 100
    },

    userNameHolder: {
        justifyContent: 'center',
        height: '100%'
    },

    mainUserName: {
        height: '50%'
    },

    subUserInfo: {
        flexDirection: 'row',
    },

    subUserInfoText: {
        color: '#ADADAD',
        fontSize: 12
    },

    headerUserName: {
        fontSize: 24
    },

    mainScrollView:{
        backgroundColor: "#f5f5f5",
        padding: 20,
    },

    headerControlButton: {
        padding: 10,
        marginLeft: 10
    },

    headingTextBlock: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },

    h2_notBold: {
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        fontSize: 30,
        color: '#3e3e3e'
    },

    bottomMenuHolder: {
        backgroundColor: '#fff',
        padding: 10,
        paddingBottom: 50,
        marginBottom:-40,
        shadowColor: '#000',
        shadowRadius: 15,
        shadowOpacity: 0.2,
        elevation: 20
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    bm_feeding: {
        backgroundColor: '#5379FF',
        borderWidth: 2,
        borderColor: '#5379FF'
    },

    bm_sleep: {
        borderWidth: 2,
        borderColor: '#5379FF'
    },

    addRecordButton: {
        backgroundColor: '#FF5995',
        borderWidth: 2,
        borderColor: '#FF5995'
    },

    bottomMeuButton: {
        padding: 7,
        borderRadius: 15
    },

    recordRow: {
        marginBottom: 10
    },

    recordBlockWrapper: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20
    },

    recordTextPartHolder: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    rtpIcon: {
        backgroundColor: '#FF5995',
        aspectRatio: '1/1',
        padding: 5,
        borderRadius: 10,
        marginEnd: 20
    },

    rtpTextName: {
        fontSize: 20,
        //lineHeight: 25
    },

    rtpTextDate: {
        fontSize: 10,
        color: '#AAAAAA'
    },

    recordTimeText: {
        fontSize: 30
    },

    timeCheckBlock: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tcb_pill: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    },

    tcb_timePass: {
        alignItems: 'center',
        marginTop: 5
    },

    tcb_TextDate: {
        color: '#AAAAAA'
    }
    
})

export { mainStyles }