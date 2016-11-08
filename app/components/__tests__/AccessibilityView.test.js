import 'react-native'
import React from 'react'
import { AccessibilityView } from '../AccessibilityView'
// Note: test rendere}r must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native-localization')

describe('AccessibilityView component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<AccessibilityView name="test" scene={{name: 'test'}} />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
