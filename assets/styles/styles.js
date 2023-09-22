import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    wrapper: {
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'flex-end'
    },

    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },

    containerPattern: {
        flex: 1,
        justifyContent: 'center',
    },

    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    regBlock: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: '5%',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 20,
    },

    formWrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-end'
    },

    formHolder: {
        width: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    signUpText: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: '10%',
        fontFamily: 'Inter-Regular'
    },

    logoImg: {
        marginBottom: '5%',
        transform: [{scale: 0.8}]
    },

    h1: {
        fontSize: 30,
        marginBottom: '2%',
        textAlign: 'center',
        fontFamily: 'Inter-Regular'
    },

    hiEmoji:{
        fontSize: 30,
        marginTop: -10
    },

    h3: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Inter-Regular'
    },

    haveAccountRow: {
        marginTop: 40,
    },

    haveAccountText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular'
    },

    signUpForm: {
        width: '70%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    signUpFormIcon: {
        marginLeft: 20,
    },

    confirmButton: {
        borderRadius: 10,
        fontSize: 16,
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingTop: '5%',
        paddingBottom: '5%',
        backgroundColor: '#5379FF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    disabledConfirmButton: {
        backgroundColor: '#d3d3d3'
    },

    confirmButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-Regular'
    },

    continueWithoutRegisterBlock: {
        width: '100%',
        marginTop: 30,
    },

    continueWRButton: {
        width: '100%',
        padding: '2%',
    },

    clearBtn: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    clearBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5379FF',
        textAlign: 'center',
        fontFamily: 'Inter-Regular'
    }
})

export { styles }