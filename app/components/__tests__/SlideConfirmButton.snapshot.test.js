import 'react-native'
import React from 'react'
import SlideConfirmButton from '../SlideConfirmButton'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('SlideConfirmButton component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<SlideConfirmButton text="button" onSlideSuccess={() => {return null}} />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
