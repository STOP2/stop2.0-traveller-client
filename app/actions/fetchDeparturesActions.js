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
  return dispatch => {
    dispatch(requestDepartures(latitude, longitude))
    return fetch('https://stop20.herokuapp.com/stops?lat=' + latitude + '&lon=' + longitude)
      .then(response => response.json())
      .then(json => dispatch(receiveDepartures(json)))
  }
}
