import fetchDeparturesReducer, { initialState } from '../../reducers/fetchDeparturesReducer'
import { requestDepartures, receiveDepartures, requestError } from '../../actions/fetchDeparturesActions'

describe('fetch reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(fetchDeparturesReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles REQUEST_DEPARTURES action', () =>
    {
        expect(fetchDeparturesReducer(initialState, requestDepartures(60.203978, 24.9633573))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(fetchDeparturesReducer(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })

    it('handles REQUEST_ERROR action', () =>
    {
        expect(fetchDeparturesReducer(initialState, requestError('error'))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(fetchDeparturesReducer(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })
})
