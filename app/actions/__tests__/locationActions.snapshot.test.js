import { setLocation } from '../locationActions'

describe('location actions', () =>
{
    it('creates a SET_LOCATION action', () =>
    {
        expect(setLocation({coords: []})).toMatchSnapshot()
    })
})
