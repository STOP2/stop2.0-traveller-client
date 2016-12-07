import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import StopTitle from '../StopTitle';

jest.mock('react-native-localization');

describe('StopTitle component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StopTitle name="A.I. Virtasen aukio" line="5302" distance={394} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
