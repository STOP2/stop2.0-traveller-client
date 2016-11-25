import fcmReducer, { initialState } from '../../reducers/fcmReducer'
import { setFCMToken } from '../../actions/fcmActions'

describe('fcm reducer', () =>
{
    it('returns the same state on an unhandled action', () =>
    {
        expect(fcmReducer(initialState, {type: '_NULL'})).toMatchSnapshot()
    })

    it('handles SET_FCM_TOKEN action', () =>
    {
        expect(fcmReducer(initialState, setFCMToken(12345))).toMatchSnapshot()
    })
})