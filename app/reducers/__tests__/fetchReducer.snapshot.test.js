import fetchReducer, { initialState } from '../../reducers/fetchReducer'
import { requestDepartures, receiveDepartures, requestError } from '../../actions/fetchDeparturesActions'
import { requestStoprequest, receiveConfirm  } from '../../actions/sendStoprequest'
import { requestRouteStops, receiveRouteStops, requestError as requestRouteStopsError } from '../../actions/fetchRouteStops'

describe('fetch reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(fetchReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles REQUEST_DEPARTURES action', () =>
    {
        expect(fetchReducer(initialState, requestDepartures(60.203978, 24.9633573))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(fetchReducer(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })

    it('handles REQUEST_ERROR action', () =>
    {
        expect(fetchReducer(initialState, requestError('error'))).toMatchSnapshot()
    })

    it('handles RECEIVE_DEPARTURES action', () =>
    {
        let departuresData = {"stops": [{"stop": {"schedule": [{"arrival": 7, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1412", "vehicle_type": 3}, {"arrival": 21, "destination": "Rautatientori", "line": "55", "route_id": "HSL:1055", "trip_id": "HSL:1055_20161003_La_2_1427", "vehicle_type": 3}], "stop_code": "3597", "stop_name": "A.I. Virtasen aukio"}}]}

        expect(fetchReducer(initialState, receiveDepartures(departuresData))).toMatchSnapshot()
    })

    it('handles RECEIVE_CONFIRM action', () =>
    {
        expect(fetchReducer(initialState, receiveConfirm())).toMatchSnapshot()
    })

    it('handles SEND_STOPREQUEST action', () =>
    {
        expect(fetchReducer(initialState, requestStoprequest(1, 2, 'stop'))).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS action', () =>
    {
        expect(fetchReducer(initialState, requestRouteStops(1, 2))).toMatchSnapshot()
    })

    it('handles RECEIVE_ROUTE_STOPS action', () =>
    {
        expect(fetchReducer(initialState, receiveRouteStops({stops: []}))).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS_ERROR action', () =>
    {
        expect(fetchReducer(initialState, requestRouteStopsError(true))).toMatchSnapshot()
    })
})