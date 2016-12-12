import departures, { initialState } from '../../reducers/departures'
import { requestDepartures, receiveDepartures, requestError } from '../../actions/fetchDeparturesActions'
import { resetState } from '../../actions/resetStateAction'

describe('fetch reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(departures(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles REQUEST_DEPARTURES action', () =>
    {
        expect(departures(initialState, requestDepartures(60.203978, 24.9633573))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(departures(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })

    it('handles REQUEST_ERROR action', () =>
    {
        expect(departures(initialState, requestError('error'))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(departures(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })

    it('handles RESET_STATE action', () =>
    {
        expect(departures(initialState, resetState())).toMatchSnapshot()
    })

})
