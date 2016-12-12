import { StyleSheet, Dimensions } from 'react-native'
import colors from './colors'

const styles = StyleSheet.create({
    defaultText: {fontFamily: 'gotham-rounded-book'},
    boldText: {fontFamily: 'gotham-rounded-medium'},
    flex1: {flex: 1},
    flex3: {flex: 3},
    flexRow: {flexDirection: 'row'},
    padding10: {padding: 10},
    busrow: {
        flexDirection: 'row',
        height: 60,
        padding: 10,
        alignItems: 'center'
    },
    busrowheader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.stopBackground
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
        color: colors.black,
        fontSize: 15
    },
    busrowTextBlack2: {
        flex: 3,
        color: colors.black,
        fontSize: 15
    },
    busrowImage: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    vehiclerow: {
        flexDirection: 'row',
        height: 60,
        padding: 10,
        alignItems: 'center'
    },
    vehiclerowheader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.stopBackground
    },
    vehiclerowText: {
        flex: 1,
        fontSize: 15
    },
    vehiclerowText2: {
        flex: 3,
        fontSize: 15
    },
    vehiclerowTextBlack: {
        flex: 1,
        color: colors.black,
        fontSize: 15
    },
    vehiclerowTextBlack2: {
        flex: 3,
        color: colors.black,
        fontSize: 15
    },
    vehiclerowImage: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    bottomBorder: {
        borderBottomColor: colors.white,
        borderBottomWidth: 0.5
    },
    mainTitleCont: {
        height: 50,
        backgroundColor: colors.busBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainTitle: {
        fontSize: 25,
        color: colors.white
    },
    title: {
        fontSize: 25,
        backgroundColor: colors.busBlue,
        color: colors.white,
        padding: 15
    },
    stopTitle: {
        fontSize: 20,
        backgroundColor: colors.busBlue,
        color: colors.white,
        padding: 5
    },
    start: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    startText: {
        color: colors.white,
        fontSize: 50
    },
    locationErrorText: {
        textAlign: 'center',
        flex: 1,
        color: colors.busBlue,
        fontSize: 20
    },
    stopRequestStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinnerBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    spinnerContainer: {
        backgroundColor: colors.transparent,
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        marginBottom: 7,
        padding: 5,
        backgroundColor: colors.HSLgreen,
        borderRadius: 5,
        margin: 20
    },
    buttonLabel: {
        fontSize: 20,
        color: colors.white,
        fontFamily: 'gotham-rounded-medium'
    },
    confirmText: {
        fontSize: 40,
        textAlign: 'center',
        color: colors.white
    },
    backText: {
        fontSize: 20,
        color: colors.K40,
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
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
        margin: 15
    },
    sliderText: {
        position: 'absolute',
        fontSize: 25,
        color: colors.white,
        textAlign: 'center',
        margin: 20
    },
    sliderBackgroundRed: {
        backgroundColor: colors.HSLalarmRed,
        height: 80,
        padding: 5,
        borderRadius: 30,
        margin: 10
    },
    sliderBackgroundGreen: {
        height: 80,
        backgroundColor: colors.HSLgreen,
        padding: 5,
        borderRadius: 30,
        margin: 10
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
        textAlign: 'center'
    },
    error: {
        backgroundColor: colors.HSLalarmRed,
        color: colors.white,
        fontSize: 15,
        padding: 10
    },
    buslistIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    tryAgain: {
        textAlign: 'center',
        color: colors.tryAgain
    },
    goToRouteViewButton: {
        padding: 5,
        backgroundColor: colors.HSLpink,
        borderRadius: 30,
        margin: 10
    },
    placeholderButton: {
        marginBottom: 0,
        padding: 5,
        backgroundColor: colors.transparent,
        borderRadius: 5,
        margin: 20
    },
    goToRouteViewButtonText: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        margin: 15
    },
    placeholderButtonText: {
        color: colors.transparent,
        fontSize: 20,
        textAlign: 'center',
        margin: 15
    },
    rowSeparator: {
        flexDirection: 'row',
        borderBottomColor: colors.K10,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    vehicleArrivesInText: {
        fontSize: 20,
        textAlign: 'center'
    },
    vehicleArrivesInWrapper: {marginBottom: 2},
    stopRequestVehicleInfo: {
        marginBottom: 20,
        flexDirection: 'row'
    },
    vehicleMinutesLeft: {
        fontSize: 40,
        textAlign: 'center'
    },
    fetchDeparturesError: {
        textAlign: 'center',
        fontSize: 30
    },
    loadingDeparturesText: {
        textAlign: 'center',
        fontSize: 25
    },
    stopRequestSentBackground: {
        padding: 10,
        width: undefined,
        height: undefined,
        backgroundColor: colors.lightFerryBlue
    },
    stopRequestSentText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default styles
