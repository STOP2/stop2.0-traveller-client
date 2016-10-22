import mockStore from 'redux-mock-store';

import { fetchDepartures } from '../fetchDeparturesActions';

const store = mockStore();

beforeEach(() => {
    store.clearActions();
});

it('should handle RECEIVE_DEPARTURES action', async () => {
    const response = '{"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}';

    fetch.mockResponseSuccess(response);

    await store.dispatch(fetchDepartures(20.045, 15.234));

    expect(store.getActions()).toMatchSnapshot();
});