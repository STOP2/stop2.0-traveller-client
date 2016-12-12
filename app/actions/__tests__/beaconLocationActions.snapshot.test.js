import { setBeaconData, requestBeaconData, beaconError } from '../beaconLocationActions';

describe('beacon location actions', () => {
  it('creates a SET_BEACON_DATA action', () => {
    expect(setBeaconData({ beaconData: [] })).toMatchSnapshot();
  });

  it('creates a REQUEST_BEACON_DATA action', () => {
    expect(requestBeaconData()).toMatchSnapshot();
  });

  it('creates a BEACON_ERROR action', () => {
    expect(beaconError(true)).toMatchSnapshot();
  });
});
