import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  busrow: {
    flexDirection: 'row',
    borderBottomColor:666666,
    borderBottomWidth:1,
    height: 60,
    padding: 10,
    alignItems: 'center'
  },
  busrowheader: {
    flexDirection: 'row',
    padding:10,
    backgroundColor:'#e9e9e9'
  },
  busrowText: {
    flex:1,
    fontFamily: 'gotham-rounded-book',
    fontSize:15
  },
  busrowText2: {
    flex:3,
    fontFamily: 'gotham-rounded-book',
    fontSize:15
  },
  busrowTextBlack: {
    flex:1,
    fontFamily: 'gotham-rounded-book',
    color:'black',
    fontSize:15
  },
  busrowTextBlack2: {
    flex:3,
    fontFamily: 'gotham-rounded-book',
    color:'black',
    fontSize:15
  },
  title: {
    fontSize:29,
    backgroundColor:'#007AC9',
    color:'white',
    padding:15,
    fontFamily: 'gotham-rounded-book'
  },
  start: {
    flex:1,
    padding: 10,
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
    flex:1,
    color: '#007AC9',
    fontSize: 20,
    fontFamily: 'gotham-rounded-book'
  },
  gettingLocationText: {
    flex:1,
    color: '#007AC9',
    fontSize: 30,
    fontFamily: 'gotham-rounded-book'
  },
  stopRequestStyle: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
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
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#00B9E4',
    borderRadius: 10,
    marginBottom: 3
  },
  startLower: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F092CD',
    borderRadius: 10,
    marginTop: 3
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
    fontSize: 40,
    textAlign: 'center',
    margin: 15,
    fontFamily: 'gotham-rounded-medium'
  }
});

export default styles;
