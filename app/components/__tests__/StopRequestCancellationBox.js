import 'react-native'
import React from 'react'
import StopRequestCancellationBox from '../StopRequestCancellationBox'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


jest.mock('react-native-localization')

describe('StopRequestCancellationBox component', () =>
{
    it('renders correctly', () =>
    {
        let tree = renderer.create(<StopRequestCancellationBox supportsStopRequest={true} onPress={() => {}} />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
