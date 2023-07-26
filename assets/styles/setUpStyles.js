import { StyleSheet, Platform, StatusBar } from 'react-native';

const setUpStyles = StyleSheet.create({

    wrapper: {
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'flex-end'
    },

    container: {
        width: '100%',
        height: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    scrollViewMain: {
        width: '100%',
        height: '100%',
    },

    childFormConfirm: {
        backgroundColor: '#fff',
    },

    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    setUpHeaderText: {
        fontFamily: 'Inter-Regular',
        fontSize: 20
    },

    setUpContentSlider: {
        borderColor: '#f5f5f5',
        overflow: 'visible',
        minHeight: 100,
        paddingHorizontal: 20
    },

    childForm:{
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    imageContainer: {
        alignItems: 'center'
    },

    imageContainerChanger:{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    childPhotoIconBlock:{
        width: '30%',
        aspectRatio: '1/1',
        borderColor: '#d3d3d3',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },

    childPhotoImage:{
        width: '30%',
        aspectRatio: '1/1',
        borderRadius: 10,
    },

    childPhotoIconChange: {
        position: 'relative',
        backgroundColor: '#5379FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 100,
        marginBottom: -40,
        bottom: 40,
        right: -40
    },

    childFormInputsBlockWrapper: {
        height: 30,
        backgroundColor: '#EFEFF0'
    },

    childFormInputsBlock: {
        width: '100%',
        marginTop: 10,
        //paddingHorizontal: 20
    },

    childFormInputsBlock_2: {
        width: '40%',
        marginTop: 10,
    },

    childFormInputs: {
        width: '100%',
        alignItems: 'center',
    },

    childFormInputsLabel: {
        marginBottom: 10
    },

    childFormInputsLabelText: {
        fontSize: 14
    },

    setUpBlockWrapper:{
        width: '100%',
        marginTop: 20,
    },

    textInWrap: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        marginLeft: 0,
        backgroundColor: '#EFEFF0',
        borderRadius: 10,
    },

    childFormInputsRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    setUpCard: {
        width: 140,
        height: 70,
        paddingTop: 5,
        paddingBttom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 15,
        shadowOpacity: 0.1,
        backgroundColor: '#fff',
        elevation: 2,
    },

    setUpCardName: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        marginBottom: 5
    },

    setUpCardIcon: {
        backgroundColor: '#FF5995',
        aspectRatio: '1/1',
        padding: 1,
        borderRadius: 4,
        marginRight: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    setUpCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },

    setUpCardText: {
        fontFamily: 'Inter-Bold',
        fontSize: 20
    },

    setUpCardTitle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },

    genderPresSheet: {
        backgroundColor: '#EFEFF0',
        paddingTop:6,
        paddingBottom: 6,
        paddingLeft: 15,
        borderRadius: 7

    },

    genderPresSheetText: {
        fontSize: 18
    },

    inputWrapperRow: {
        width: '50%',
        marginLeft: 20
    },

    childFormMainInfo: {
        paddingHorizontal: 20
    },

    setUpHeader: {
        paddingHorizontal: 20
    },

    iosDateInput: {
        marginLeft: -15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }

})

export { setUpStyles }