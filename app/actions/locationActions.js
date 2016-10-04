export const SET_LOCATION = 'SET_LOCATION'

export function setLocation(locationData) {
  return {
    type: SET_LOCATION,
    locationData: locationData
  }
}
