import gpsLocation, { initialState } from '../../reducers/gpsLocation';
import { setGpsLocation, gpsLocationError, requestGpsLocation } from '../../actions/gpsLocationActions';
import { resetState } from '../../actions/resetStateAction';

describe('gps location reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(gpsLocation(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles SET_GPS_LOCATION action', () => {
    const locationData = { coords: [] };
    expect(gpsLocation(initialState, setGpsLocation(locationData))).toMatchSnapshot();
  });

  it('handles REQUEST_GPS_LOCATION action', () => {
    expect(gpsLocation(initialState, requestGpsLocation())).toMatchSnapshot();
  });

  it('handles GPS_LOCATION_ERROR action', () => {
    expect(gpsLocation(initialState, gpsLocationError(true))).toMatchSnapshot();
  });

  it('handles RESET_STATE action', () => {
    expect(gpsLocation(initialState, resetState())).toMatchSnapshot();
  });
});
