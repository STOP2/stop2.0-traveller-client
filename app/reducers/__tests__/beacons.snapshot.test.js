import beacons, { initialState } from '../../reducers/beacons'
import { setBeaconData, beaconError, requestBeaconData } from '../../actions/beaconLocationActions'
import { resetState } from '../../actions/resetStateAction'

describe('beacon location reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(beacons(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_BEACON_DATA action', () =>
    {
        let beaconData = {beaconData: []}
        expect(beacons(initialState, setBeaconData(beaconData))).toMatchSnapshot()
    })

    it('handles REQUEST_BEACON_DATA action', () =>
    {
        expect(beacons(initialState, requestBeaconData())).toMatchSnapshot()
    })

    it('handles RESET_STATE action', () =>
    {
        expect(beacons(initialState, resetState())).toMatchSnapshot()
    })


    it('handles BEACON_ERROR action', () =>
    {
        expect(beacons(initialState, beaconError(true))).toMatchSnapshot()
    })
})
