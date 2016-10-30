import 'react-native'
import React from 'react'
import BusListHeader from '../BusListHeader'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('BusListHeader component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<BusListHeader />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
