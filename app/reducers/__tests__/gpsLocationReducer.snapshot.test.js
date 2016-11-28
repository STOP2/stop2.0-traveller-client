import gpsLocationReducer, { initialState } from '../../reducers/gpsLocationReducer'
import { setGpsLocation, gpsLocationError } from '../../actions/gpsLocationActions'

describe('gps location reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(gpsLocationReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_GPS_LOCATION action', () =>
    {
        let locationData = {coords: []}
        expect(gpsLocationReducer(initialState, setGpsLocation(locationData))).toMatchSnapshot()
    })

    it('handles GPS_LOCATION_ERROR action', () =>
    {
        expect(gpsLocationReducer(initialState, gpsLocationError(true))).toMatchSnapshot()
    })
})
