import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TitleBar, BoldTitleBar } from '../TitleBar';

jest.mock('react-native-localization');

describe('TitleBar component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TitleBar title="otsikko" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('BoldTitleBar component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<BoldTitleBar noBorder={false} title="otsikko" />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly without border', () => {
        const tree = renderer.create(<BoldTitleBar noBorder={true} title="otsikko" />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});