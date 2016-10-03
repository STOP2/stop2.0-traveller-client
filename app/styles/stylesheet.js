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
  title: {
    fontSize:29,
    backgroundColor:'#007AC9',
    color:'white',
    padding:10
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
    marginBottom: 7,
    padding: 5,
    color: '#64BE14',
    fontSize: 40,
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
  }
});

export default styles;
