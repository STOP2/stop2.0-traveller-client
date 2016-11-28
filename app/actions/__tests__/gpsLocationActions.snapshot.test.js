import { setGpsLocation } from '../gpsLocationActions'

describe('gps location actions', () =>
{
    it('creates a SET_GPS_LOCATION action', () =>
    {
        expect(setGpsLocation({coords: []})).toMatchSnapshot()
    })
})
