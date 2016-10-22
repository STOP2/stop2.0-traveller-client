import locationReducer, { initialState } from '../../reducers/locationReducer'
import { setLocation } from '../../actions/locationActions'

describe('location reducer', () => {
    it('returns the same state on an unhandled action', () => {
        expect(locationReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_LOCATION action', () => {
        let locationData = {coords: []}
        expect(locationReducer(initialState, setLocation(locationData))).toMatchSnapshot()
    })
})