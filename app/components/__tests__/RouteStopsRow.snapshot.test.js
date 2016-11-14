import 'react-native'
import React from 'react'
import RouteStopsRow from '../RouteStopsRow'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('RouteStopsRow component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<RouteStopsRow stopId="5124" stopName="Kumpulan kampus" arrivalTime={5} />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
