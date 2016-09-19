import LocalizedStrings from 'react-native-localization'

var strings = new LocalizedStrings({
  en: {
    onBus: 'On the bus',
    onStop: 'On the stop',
    title: 'Departures from',
    type: 'Type',
    line: 'Line',
    dest: 'Destination',
    leaves: 'Leaves',
    bus: 'Bus',
    stopsAt: 'stops at',
    back: 'Back'
  },

  fi: {
    onBus: 'Bussissa',
    onStop: 'Pysäkillä',
    title: 'Lähdöt pysäkiltä',
    type: 'Tyyppi',
    line: 'Linja',
    dest: 'Määränpää',
    leaves: 'Lähtee',
    bus: 'Bussi',
    stopsAt: 'Pysähtyy pysäkillä',
    back: 'Takaisin'
  }
});

export default strings;
