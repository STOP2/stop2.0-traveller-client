import 'react-native'
import React from 'react'
import RouteInfo from '../RouteInfo'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('RouteInfo component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<RouteInfo title="title" vehicleType={0} vehicleLine="506" vehicleDestination="Meilahti"  vehicleMinutesLeft="5 min" />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
