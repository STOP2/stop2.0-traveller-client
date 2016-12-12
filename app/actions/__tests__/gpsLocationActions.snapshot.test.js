
import mockStore from 'redux-mock-store';

import { setGpsLocation, getGpsLocation, requestGpsLocation, gpsLocationError } from '../gpsLocationActions';

const store = mockStore();

const mockLocationSuccess = function mockLocationSuccess(geoSuccess, geoError, geoOptions) {
  geoSuccess({
    coords: {
      latitude: 60.203978,
      longitude: 24.9633573,
    },
  });
};

const mockLocationError = function mockLocationError(geoSuccess, geoError, geoOptions) {
  geoError('Failed to get location');
};

beforeEach(() => {
  store.clearActions();
});

describe('gps location actions', () => {
  it('creates a SET_GPS_LOCATION action', () => {
    expect(setGpsLocation({ coords: [] })).toMatchSnapshot();
  });

  it('creates a REQUEST_GPS_LOCATION action', () => {
    expect(requestGpsLocation()).toMatchSnapshot();
  });

  it('creates a GPS_LOCATION_ERROR action', () => {
    expect(gpsLocationError(true)).toMatchSnapshot();
  });

  it('returns a location object', async () => {
    await store.dispatch(getGpsLocation(mockLocationSuccess));

    expect(store.getActions()).toMatchSnapshot();
  });

  it('returns a location object', async () => {
    await store.dispatch(getGpsLocation(mockLocationError));

    expect(store.getActions()).toMatchSnapshot();
  });
});
