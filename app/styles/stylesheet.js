import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor: '#007AC9',
        borderBottomColor: '#e9e9e9',
        justifyContent: 'center'
    },
    navBarTitle: {
        fontFamily: 'gotham-rounded-medium',
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
        fontFamily: 'gotham-rounded-book',
        fontSize: 15
    },
    busrowText2: {
        flex: 3,
        fontFamily: 'gotham-rounded-book',
        fontSize: 15
    },
    busrowTextBlack: {
        flex: 1,
        fontFamily: 'gotham-rounded-book',
        color: 'black',
        fontSize: 15
    },
    busrowTextBlack2: {
        flex: 3,
        fontFamily: 'gotham-rounded-book',
        color: 'black',
        fontSize: 15
    },
    title: {
        fontSize: 25,
        backgroundColor: '#007AC9',
        color: 'white',
        padding: 15,
        fontFamily: 'gotham-rounded-book'
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
        fontSize: 50,
        fontFamily: 'gotham-rounded-medium'
    },
    locationErrorText: {
        textAlign: 'center',
        flex: 1,
        color: '#007AC9',
        fontSize: 20,
        fontFamily: 'gotham-rounded-book'
    },
    gettingLocationText: {
        textAlign: 'center',
        flex: 1,
        color: '#007AC9',
        fontSize: 30,
        fontFamily: 'gotham-rounded-book'
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
        backgroundColor: '#64BE14',
        borderRadius: 5,
        margin: 20
    },
    confirmText: {
        fontSize: 40,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'gotham-rounded-medium'
    },
    backText: {
        fontSize: 20,
        color: '#666666',
        textAlign: 'center',
        fontFamily: 'gotham-rounded-book'
    },
    busStopsAtText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'gotham-rounded-book'
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
        backgroundColor: '#00B9E4',
        borderRadius: 10,
        marginBottom: 5
    },
    startLower: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F092CD',
        borderRadius: 10,
        marginTop: 5
    },
    confirmedText: {
        color: '#ffffff',
        fontSize: 40,
        textAlign: 'center',
        margin: 15,
        fontFamily: 'gotham-rounded-medium'
    },
    sliderText: {
        position: 'absolute',
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'gotham-rounded-medium'
    },
    sliderBackgroundRed: {
        width: undefined,
        height: 80,
        backgroundColor: '#DC0451'
    },
    sliderBackgroundGreen: {
        width: undefined,
        height: 80,
        backgroundColor: '#64BE14'
    },
    sliderTextContainer: {
        height: 80,
        width: Dimensions.get('window').width
    },
    pysaytetaankoWrapper: {marginBottom: 10},
    pysaytetaanko: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'gotham-rounded-book'
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
        fontFamily: 'gotham-rounded-book'
    },
    error: {
        backgroundColor: '#DC0451',
        color: '#ffffff',
        fontSize: 15,
        padding: 10
    }
})

export default styles
