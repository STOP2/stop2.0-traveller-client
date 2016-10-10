import LocalizedStrings from 'react-native-localization'

let strings = new LocalizedStrings({
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
        confirm: 'Confirm',
        stopsent: 'Confirmed!',
        gettingLocation: 'Finding your location...',
        locationError: 'Unable to find your location. Make sure that GPS enabled.',
        locationPermissionsError: 'Couldn\'t set location permissions.',
        slide: 'Slide to confirm &#8658;'
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
        confirm: 'Vahvista',
        stopsent: 'Vahvistettu!',
        tryAgain: 'Yritä uudelleen',
        gettingLocation: 'Paikannetaan sijantia...',
        locationError: 'Paikantaminen epäonnistui. Varmista, että GPS on kytketty päälle.',
        locationPermissionsError: 'Sijainnin käyttöoikeuden asettaminen epäonnistui.',
        slide: 'Vahvista liu?\'uttamalla &#8658;'
    }
})

export default strings
