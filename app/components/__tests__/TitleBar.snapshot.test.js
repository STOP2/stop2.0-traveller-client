import 'react-native'
import React from 'react'
import { TitleBar } from '../TitleBar'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('TitleBar component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<TitleBar title="otsikko" />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
