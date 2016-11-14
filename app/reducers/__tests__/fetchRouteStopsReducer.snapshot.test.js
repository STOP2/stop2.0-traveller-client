import fetchRouteStopsReducer, { initialState } from '../../reducers/fetchRouteStopsReducer'
import { requestRouteStops, receiveRouteStops, requestError } from '../../actions/fetchRouteStops'

describe('fetch route stops reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(fetchRouteStopsReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS action', () =>
    {
        expect(fetchRouteStopsReducer(initialState, requestRouteStops(1, 2))).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS_ERROR action', () =>
    {
        expect(fetchRouteStopsReducer(initialState, requestError(true))).toMatchSnapshot()
    })

    it('handles RECEIVE_ROUTE_STOPS action', () =>
    {
        expect(fetchRouteStopsReducer(initialState, receiveRouteStops({stops: []}))).toMatchSnapshot()
    })
})
