import 'react-native'
import React from 'react'
import BusListHeader from '../BusListHeader'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

it('renders correctly', () => {
    let tree = renderer.create(<BusListHeader />).toJSON()

    expect(tree).toMatchSnapshot()
})

it('renders the TextInput component', () => {
    const TextInput = require('TextInput')
    const tree = renderer.create(
      <TextInput
          autoCorrect={false}
          value="apple banana kiwi"
      />
  ).toJSON()
    expect(tree).toMatchSnapshot()
})
