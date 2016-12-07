import { setBeaconData } from '../beaconLocationActions';

describe('beacon location actions', () => {
  it('creates a SET_BEACON_DATA action', () => {
    expect(setBeaconData({ beaconData: [] })).toMatchSnapshot();
  });
});
