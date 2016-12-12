import routeStops, { initialState } from '../../reducers/routeStops'
import { requestRouteStops, receiveRouteStops, requestError } from '../../actions/fetchRouteStops'
import { resetState } from '../../actions/resetStateAction'

describe('fetch route stops reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(routeStops(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS action', () =>
    {
        expect(routeStops(initialState, requestRouteStops(1, 2))).toMatchSnapshot()
    })

    it('handles REQUEST_ROUTE_STOPS_ERROR action', () =>
    {
        expect(routeStops(initialState, requestError(true))).toMatchSnapshot()
    })

    it('handles RECEIVE_ROUTE_STOPS action', () =>
    {
        expect(routeStops(initialState, receiveRouteStops({stops: []}))).toMatchSnapshot()
    })

    it('handles RESET_STATE action', () =>
    {
        expect(routeStops(initialState, resetState())).toMatchSnapshot()
    })

})
