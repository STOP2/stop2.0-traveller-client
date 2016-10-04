const API_URL = 'https://stop20.herokuapp.com'

const USE_LOCATION_RADIUS = true
const LOCATION_RADIUS = 500

export const REQUEST_DEPARTURES = 'REQUEST_DEPARTURES'
export const RECEIVE_DEPARTURES = 'RECEIVE_DEPARTURES'

function requestDepartures(latitude, longitude) {
  return {
    type: REQUEST_DEPARTURES,
    latitude: latitude,
    longitude: longitude
  }
}

function receiveDepartures(json) {
  return {
    type: RECEIVE_DEPARTURES,
    departures: json.stops
  }
}

export function fetchDepartures(latitude, longitude) {
  let radius_string = ''

  if(USE_LOCATION_RADIUS) radius_string = '&rad=' + LOCATION_RADIUS

  return dispatch => {
    dispatch(requestDepartures(latitude, longitude))
    return fetch(API_URL + '/stops?lat=' + latitude + '&lon=' + longitude + radius_string)
      .then(response => response.json())
      .then(json => dispatch(receiveDepartures(json)))
  }
}
