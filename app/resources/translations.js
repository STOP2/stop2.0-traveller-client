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
    back: 'Back',
    tram: 'Tram',
    metro: 'Metro',
    ferry: 'Ferry',
    gettingLocation: 'Finding your location...',
    locationError: 'Error finding your location'
  },

  fi: {
    onBus: 'Bussissa',
    onStop: 'Pysäkillä',
    title: 'Lähdöt pysäkiltä',
    type: 'Tyyppi',
    line: 'Linja',
    dest: 'Määränpää',
    leaves: 'Lähtee',
    bus: 'bussi',
    stopsAt: 'Pysähtyy pysäkillä',
    back: 'Takaisin',
    tram: 'Ratikka',
    metro: 'Metro',
    ferry: 'Lautta',
    tryAgain: 'Yritä uudelleen',
    gettingLocation: 'Paikannetaan sijantia...',
    locationError: 'Paikantaminen epäonnistui'
  }
});

export default strings;
