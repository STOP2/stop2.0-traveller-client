import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TitleBar } from '../TitleBar';

jest.mock('react-native-localization');

describe('TitleBar component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TitleBar title="otsikko" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
