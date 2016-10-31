import 'react-native'
import React from 'react'
import StopTitle from '../StopTitle'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('StopTitle component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<StopTitle name="A.I. Virtasen aukio" line="5302" />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
