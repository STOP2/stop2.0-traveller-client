
import mockStore from 'redux-mock-store';

import { setGpsLocation, getGpsLocation, requestGpsLocation, gpsLocationError } from '../gpsLocationActions';

const store = mockStore();

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
});
