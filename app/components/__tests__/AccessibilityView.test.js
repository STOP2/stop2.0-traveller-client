import 'react-native';
import React from 'react';
// Note: test rendere}r must be required after react-native.
import renderer from 'react-test-renderer';
import { AccessibilityView } from '../AccessibilityView';

jest.mock('react-native-localization');

describe('AccessibilityView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AccessibilityView name="test" scene={{ name: 'test' }} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
