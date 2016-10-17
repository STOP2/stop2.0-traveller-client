import { StyleSheet, Dimensions } from 'react-native'
import { colors } from 'colors'

const styles = StyleSheet.create({
    defaultText: {fontFamily: 'gotham-rounded-book'},
    boldText: {fontFamily: 'gotham-rounded-medium'},
    navBar: {
        height: 50,
        backgroundColor: colors.busBlue,
        borderBottomColor: '#e9e9e9',
        justifyContent: 'center'
    },
    navBarTitle: {
        color: '#ffffff',
        fontSize: 25,
        marginTop: 2
    },
    backButton: {
        tintColor: '#ffffff',
        marginTop: -4,
        marginLeft: 5
    },
    flex1: {flex: 1},
    flexRow: {flexDirection: 'row'},
    busrow: {
        flexDirection: 'row',
        borderBottomColor: 666666,
        borderBottomWidth: 1,
        height: 60,
        padding: 10,
        alignItems: 'center'
    },
    busrowheader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#e9e9e9'
    },
    busrowText: {
        flex: 1,
        fontSize: 15
    },
    busrowText2: {
        flex: 3,
        fontSize: 15
    },
    busrowTextBlack: {
        flex: 1,
        color: 'black',
        fontSize: 15
    },
    busrowTextBlack2: {
        flex: 3,
        color: 'black',
        fontSize: 15
    },
    title: {
        fontSize: 25,
        backgroundColor: colors.busBlue,
        color: 'white',
        padding: 15
    },
    start: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    startText: {
        color: '#ffffff',
        fontSize: 50
    },
    locationErrorText: {
        textAlign: 'center',
        flex: 1,
        color: colors.busBlue,
        fontSize: 20
    },
    gettingLocationText: {
        textAlign: 'center',
        flex: 1,
        color: colors.busBlue,
        fontSize: 30
    },
    stopRequestStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinnerContainer: {
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    button: {
        marginBottom: 7,
        padding: 5,
        backgroundColor: colors.HSLgreen,
        borderRadius: 5,
        margin: 20
    },
    confirmText: {
        fontSize: 40,
        textAlign: 'center',
        color: '#ffffff'
    },
    backText: {
        fontSize: 20,
        color: '#666666',
        textAlign: 'center'
    },
    busStopsAtText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20
    },
    startImageStop: {
        width: 100,
        height: 100
    },
    startImageVehicle: {
        width: 90,
        height: 100
    },
    startUpper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ferryBlue,
        borderRadius: 10,
        marginBottom: 5
    },
    startLower: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.HSLpink,
        borderRadius: 10,
        marginTop: 5
    },
    confirmedText: {
        color: '#ffffff',
        fontSize: 40,
        textAlign: 'center',
        margin: 15
    },
    sliderText: {
        position: 'absolute',
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        margin: 20
    },
    sliderBackgroundRed: {
        width: undefined,
        height: 80,
        backgroundColor: '#DC0451'
    },
    sliderBackgroundGreen: {
        width: undefined,
        height: 80,
        backgroundColor: colors.HSLgreen
    },
    sliderTextContainer: {
        height: 80,
        width: Dimensions.get('window').width
    },
    doYouWantToStopWrapper: {marginBottom: 10},
    doYouWantToStop: {
        fontSize: 40,
        textAlign: 'center'
    },
    busIcon: {
        width: 50,
        height: 50
    },
    vehicleInfoWrapper: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vehicleInfo: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    error: {
        backgroundColor: '#DC0451',
        color: '#ffffff',
        fontSize: 15,
        padding: 10,
    },
    buslistIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    tryAgain: {
        textAlign: 'center',
        color: '#0000ff'
    }
})

export default styles
