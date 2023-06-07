import { StyleSheet, Platform, StatusBar } from 'react-native';

const setUpStyles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    setUpHeaderText: {
        fontFamily: 'Inter-Regular',
        fontSize: 25
    },

    setUpContentSlider: {
        borderColor: '#f5f5f5',
        overflow: 'visible'
    },

    setUpCard: {
        width: 200,
        height:150,
        margin: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: 0,
        shadowRadius: 15,
        shadowOpacity: 0.08,
        backgroundColor: '#fff',
        elevation: 20,
    },

    childForm:{
        flex: 0,
        marginTop: 20,
        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    childPhotoContainer: {
        flex: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },

    imageContainerChanger:{
        width: '100%',
        alignItems: 'center',
    },

    childPhotoIconBlock:{
        width: '50%',
        aspectRatio: '1/1',
        borderColor: '#d3d3d3',
        borderWidth: 3,
        borderStyle: 'dashed',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    childPhotoImage:{
        width: '50%',
        aspectRatio: '1/1',
        borderRadius: 50,
    },

    childPhotoIconChange: {
        position: 'relative',
        backgroundColor: '#5379FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 100,
        bottom: 50,
        right: -60
    },

    childFormInputsBlockWrapper: {
        height: 30,
        backgroundColor: '#f4f5fc'
    },

    childFormInputsBlock: {
        width: '100%',
        marginTop: 20,
    },

    childFormInputs: {
        width: '100%',
        alignItems: 'center',
    },

    childFormInputsLabel: {
        marginBottom: 10
    },

    childFormInputsLabelText: {
        fontSize: 16
    },

    textInWrap: {
        marginBottom: 0
    }

})

export { setUpStyles }