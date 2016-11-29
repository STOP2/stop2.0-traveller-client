import gpsLocation, { initialState } from '../../reducers/gpsLocation'
import { setGpsLocation, gpsLocationError } from '../../actions/gpsLocationActions'

describe('gps location reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(gpsLocation(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_GPS_LOCATION action', () =>
    {
        let locationData = {coords: []}
        expect(gpsLocation(initialState, setGpsLocation(locationData))).toMatchSnapshot()
    })

    it('handles GPS_LOCATION_ERROR action', () =>
    {
        expect(gpsLocation(initialState, gpsLocationError(true))).toMatchSnapshot()
    })
})
