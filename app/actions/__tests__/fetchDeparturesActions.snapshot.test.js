import mockStore from 'redux-mock-store';

import { fetchDepartures, requestError } from '../fetchDeparturesActions';

const store = mockStore();

beforeEach(() => {
  store.clearActions();
});

describe('fetchDepartures actions', () => {
  it('should handle REQUEST_ERROR action', () => {
    expect(requestError()).toMatchSnapshot();
  });

  it('should handle RECEIVE_DEPARTURES action with beacons disabled', async () => {
    const response = '{"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}';

    fetch.mockResponseSuccess(response);

    await store.dispatch(fetchDepartures(60.203978, 24.9633573, false));

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle RECEIVE_DEPARTURES action with beacons enabled', async () => {
    const response = '{"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}';

    fetch.mockResponseSuccess(response);

    await store.dispatch(fetchDepartures(60.203978, 24.9633573, true));

    expect(store.getActions()).toMatchSnapshot();
  });
});
