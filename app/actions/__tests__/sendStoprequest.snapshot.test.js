import mockStore from 'redux-mock-store'

import { requestError, receiveConfirm, requestStoprequest, setStopRequest_requestId } from '../sendStoprequest'

const store = mockStore()

beforeEach(() =>
{
    store.clearActions()
})

describe('sendStoprequest actions', () =>
{
    it('should handle REQUEST_ERROR action', () =>
    {
        expect(requestError()).toMatchSnapshot()
    })
})
