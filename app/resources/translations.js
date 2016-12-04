import LocalizedStrings from 'react-native-localization'

let strings = new LocalizedStrings({
    en: {
        onBus: 'On the bus',
        onStop: 'At the stop',
        title: 'Departures from',
        type: 'Type',
        line: 'Line',
        dest: 'Destination',
        leaves: 'Leaves',
        stopName: 'Stop name',
        arrivesIn: 'Arrives',
        bus: 'Bus',
        stopsAt: 'stops at',
        back: 'Back',
        tram: 'Tram',
        metro: 'Metro',
        ferry: 'Ferry',
        confirm: 'Confirm',
        stopsent: 'Stop request sent',
        gettingLocation: 'Finding your location...',
        locationError: 'Unable to find your location. Make sure that GPS is enabled.',
        locationPermissionsError: 'Couldn\'t grant location permissions.',
        chooseVehicle: 'Choose a vehicle',
        noDepartures: 'No departures found, try again later',
        noStops: 'No stops found',
        stopRequest: 'Confirm stop request',
        slide: 'Slide to confirm',
        backendError: 'Error: No network connection',
        goToRouteStopsView: 'Choose your destination',
        routeStops: 'Choose a stop',
        aboutToStop: 'You\'re about to stop',
        vehicleArrivesIn: 'Arrives ',
        minutes: 'min',
        vehiclePassedStop: 'has left the stop',
        arrivesShortly: 'arrives shortly',
        arrivalNotificationTitle: 'Get ready',
        locationPermissionTitle: 'Location Permission',
        locationPermissionMessage: 'We need permission to use your location. Please grant the permission on the next view.',
        now: 'Now',
        stopRequestError: 'Stop request failed. Try again.',
        fetchDeparturesError: 'Could not fetch departures.',
        arrives: 'Arrives at',
        in: 'in',
        goToBackToFrontPage: 'Start from the beginning',
        cancelStopRequest: 'Cancel your stop request?',
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel',
        loadingDepartures: 'Fetching departures...',
        stopRequestCancellationErrorTitle: 'Error',
        stopRequestCancellationErrorMsg: 'Could not cancel your stop request. Please try again.',
        nearestStops: 'Nearest stops',
        slideToStop: 'Slide to stop',
        slideToCancel: 'Cancel stop request',
        fromStop: 'From stop',
        vehicleStopsIn: 'Stops ',
        doYouReallyWantToMakeTheStopRequest: 'Do you really want to make the stop request?',
        stop: 'Stop',
        doYouReallyWantToGoToFrontPage: 'Do you really want to start again?',
        notifyArrival: 'Notify arrival',
        weWillNotifyYou: 'You will be notified before arrival'
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
        stopName: 'Pysäkin numero',
        arrivesIn: 'Saapuu',
        stopsAt: 'Pysähtyy pysäkillä',
        back: 'Takaisin',
        tram: 'Ratikka',
        metro: 'Metro',
        ferry: 'Lautta',
        confirm: 'Vahvista',
        stopsent: 'Pysäytyspyyntö lähetetty',
        tryAgain: 'Yritä uudelleen',
        gettingLocation: 'Paikannetaan sijantia...',
        locationError: 'Paikantaminen epäonnistui. Varmista, että GPS on kytketty päälle.',
        locationPermissionsError: 'Sijainnin käyttöoikeuden asettaminen epäonnistui.',
        chooseVehicle: 'Valitse kulkuneuvo',
        noDepartures: 'Lähtöjä ei löytynyt, yritä myöhemmin uudelleen',
        noStops: 'Pysäkkejä ei löytynyt',
        stopRequest: 'Vahvista pysäytyspyyntö',
        slide: 'Vahvista liu\'uttamalla',
        backendError: 'Virhe: Ei verkkoyhteyttä',
        aboutToStop: 'Olet pysäyttämässä',
        vehicleArrivesIn: 'Saapumiseen: ',
        minutes: 'min',
        vehiclePassedStop: 'ohitti pysäkin',
        goToRouteStopsView: 'Valitse määränpää',
        routeStops: 'Valitse pysäkki',
        arrivesShortly: 'saapuu hetken kuluttua pysäkillesi',
        arrivalNotificationTitle: 'Ole valmiina',
        locationPermissionTitle: 'Sijainnin määritys',
        locationPermissionMessage: 'Tarvitsemme luvan määrittää sijaintisi. Hyväksy lupapyyntö seuraavassa näkymässä.',
        now: 'Nyt',
        stopRequestError: 'Pysäytyspyyntö epäonnistui. Yritä uudestaan.',
        fetchDeparturesError: 'Virhe aikataulutietojen hakemisessa',
        arrives: 'Saapumiseen pysäkille',
        in: ' ',
        goToBackToFrontPage: 'Aloita alusta',
        cancelStopRequest: 'Perutaanko pysäytyspyyntö?',
        yes: 'Kyllä',
        no: 'Ei',
        cancel: 'Peruuta',
        loadingDepartures: 'Ladataan aikataulutietoja...',
        stopRequestCancellationErrorTitle: 'Virhe',
        stopRequestCancellationErrorMsg: 'Peruutuspyyntö epäonnistui. Yritä uudelleen.',
        nearestStops: 'Lähellä olevat pysäkit',
        slideToStop: 'Pysäytä liu\'uttamalla',
        slideToCancel: 'Peruuta pysäytyspyyntö',
        fromStop: 'Pysäkiltä',
        vehicleStopsIn: 'Pysähtymiseen: ',
        doYouReallyWantToMakeTheStopRequest: 'Haluatko varmasti tehdä pysäytyspyynnön?',
        stop: 'Pysäytä',
        doYouReallyWantToGoToFrontPage: 'Aloitetaanko alusta?',
        notifyArrival: 'Ilmoita saapumisesta',
        weWillNotifyYou: 'Saat ilmoituksen ennen pysäkille saapumista'
    }
})

export default strings
