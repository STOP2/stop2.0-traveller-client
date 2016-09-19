import LocalizedStrings from 'react-native-localization'

var strings = new LocalizedStrings({
  en: {
    title: "Departures from stop",
    type: "Type",
    line: "Line",
    dest: "Destination",
    leaves: "Leaves",
    bus: "Bus",
  },

  fi: {
    title: "Lähdöt pysäkiltä",
    type: "Tyyppi",
    line: "Linja",
    dest: "Määränpää",
    leaves: "Lähtee",
    bus: "Bussi"
  }
});

export default strings;
