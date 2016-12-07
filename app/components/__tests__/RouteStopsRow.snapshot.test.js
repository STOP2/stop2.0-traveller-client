import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import RouteStopsRow from '../RouteStopsRow';

jest.mock('react-native-localization');

describe('RouteStopsRow component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RouteStopsRow stopId="5124" stopName="Kumpulan kampus" arrivalTime={5} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
