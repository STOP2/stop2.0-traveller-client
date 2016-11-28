import beaconLocationReducer, { initialState } from '../../reducers/beaconLocationReducer'
import { setBeaconData, beaconError } from '../../actions/beaconLocationActions'

describe('beacon location reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(beaconLocationReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_BEACON_DATA action', () =>
    {
        let beaconData = {beaconData: []}
        expect(beaconLocationReducer(initialState, setBeaconData(beaconData))).toMatchSnapshot()
    })

    it('handles BEACON_ERROR action', () =>
    {
        expect(beaconLocationReducer(initialState, beaconError(true))).toMatchSnapshot()
    })
})
