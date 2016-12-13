import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import BusListHeader, { RouteListHeader } from '../BusListHeader';

jest.mock('react-native-localization');

describe('BusListHeader component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BusListHeader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('RouteListHeader component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<RouteListHeader />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});