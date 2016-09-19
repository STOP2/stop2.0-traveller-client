import LocalizedStrings from 'react-native-localization'

var strings = new LocalizedStrings({
  en: {
    title: "Departures from stop",
    type: "Type",
    line: "Line",
    dest: "Destination",
    leaves: "Leaves",
    bus: "Bus",
    stopsAt: 'stops at',
    back: 'Back'
  },

  fi: {
    title: "Lähdöt pysäkiltä",
    type: "Tyyppi",
    line: "Linja",
    dest: "Määränpää",
    leaves: "Lähtee",
    bus: "Bussi",
    stopsAt: 'Pysähtyy pysäkillä',
    back: 'Takaisin'
  }
});

export default strings;
