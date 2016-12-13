export const SET_GPS_LOCATION = 'SET_GPS_LOCATION';
export const GPS_LOCATION_ERROR = 'GPS_LOCATION_ERROR';
export const REQUEST_GPS_LOCATION = 'REQUEST_GPS_LOCATION';
export const CLEAR_LOCATION = 'CLEAR_LOCATION';

let watchId = false;
let coords;

export const setGpsLocation = function setGpsLocation(gpsLocationData) {
  return {
    type: SET_GPS_LOCATION,
    gettingGpsLocation: false,
    gpsLocationData,
  };
};

export const requestGpsLocation = function requestGpsLocation() {
  return {
    type: REQUEST_GPS_LOCATION,
    gettingGpsLocation: true,
  };
};

export const gpsLocationError = function gpsLocationError(error) {
  return {
    type: GPS_LOCATION_ERROR,
    error,
    gettingGpsLocation: false,
  };
};

export const getGpsLocation = function getGpsLocation(locationFunction) {
  return (dispatch) => {
    if (!watchId) {
      dispatch(requestGpsLocation());
      if (locationFunction) {
        locationFunction((position) => {
          dispatch(setGpsLocation(position.coords));
        },
        (error) => {
          dispatch(gpsLocationError(error));
        },
          {
            enableHighAccuracy: false,
            timeout: 60000,
            maximumAge: 1000,
          });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          coords = position.coords
          dispatch(setGpsLocation(coords));
        },
        (error) => {
          dispatch(gpsLocationError(error));
        },
          {
            enableHighAccuracy: false,
            timeout: 60000,
            maximumAge: 1000,
          });


        watchId = navigator.geolocation.watchPosition((position) => {
          coords = position.coords;
          dispatch(setGpsLocation(coords));
        },
        (error) => {},
          {
            enableHighAccuracy: false,
            timeout: 60000,
            maximumAge: 1000,
          });
      }
    } else if (coords) {
      dispatch(setGpsLocation(coords));
    } else {
      dispatch(requestGpsLocation());
    }
  };
};

export const clearWatchLocation = function clearWatchLocation() {
  navigator.geolocation.clearWatch(watchId);
  watchId = false;

  return { type: CLEAR_LOCATION };
};
