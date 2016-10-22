import { setLocation } from '../locationActions'

it('creates a SET_LOCATION action', () => {
    expect(setLocation({coords: []})).toMatchSnapshot()
})
