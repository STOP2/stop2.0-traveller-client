import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  busrow: {
    flexDirection: 'row',
    padding:10,
    borderBottomColor:666666,
    borderBottomWidth:1
  },
  busrowheader: {
    flexDirection: 'row',
    padding:10,
    backgroundColor:'#e9e9e9',
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
    justifyContent: 'center'
  },
  startText: {
    flex:1,
    color: '#007AC9',
    fontSize: 60
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
  }
});

export default styles;
