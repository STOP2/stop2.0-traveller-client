import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import StartViewButtons from '../StartViewButtons';

jest.mock('react-native-localization');

describe('StartViewButtons component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StartViewButtons />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
