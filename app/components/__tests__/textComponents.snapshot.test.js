import 'react-native'
import React from 'react'
import { DefaultText, BoldText } from '../textComponents'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native-localization')

let textStyle = {padding: 10}

describe('DefaultText component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<DefaultText style={textStyle}>x</DefaultText>).toJSON()

        expect(tree).toMatchSnapshot()
    })
})

describe('BoldText component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<BoldText style={textStyle}>x</BoldText>).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
