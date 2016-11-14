import 'react-native'
import React from 'react'
import StartViewButtons from '../StartViewButtons'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('StartViewButtons component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<StartViewButtons />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
