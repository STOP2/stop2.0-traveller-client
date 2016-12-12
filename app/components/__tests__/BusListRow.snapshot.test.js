import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import BusListRow from '../BusListRow';

jest.mock('react-native-localization');

describe('BusListRow component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BusListRow vehicleType={0} line="506" destination="Pasila" arrival={5} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
