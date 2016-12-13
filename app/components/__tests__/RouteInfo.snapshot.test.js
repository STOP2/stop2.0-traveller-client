import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import RouteInfo, { RouteInfoForStop } from '../RouteInfo';
import strings from '../../resources/translations'

jest.mock('react-native-localization');

describe('RouteInfo component', () => {
  it('renders correctly as a tram', () => {
    const tree = renderer.create(<RouteInfo title="title" vehicleType={0} vehicleLine="506" vehicleDestination="Meilahti" vehicleMinutesLeft="5 min" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

    it('renders correctly as a tram with minutesLeft as strings.now', () => {
        const tree = renderer.create(<RouteInfo title="title" vehicleType={0} vehicleLine="506" vehicleDestination="Meilahti" vehicleMinutesLeft={strings.now} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly as a bus', () => {
        const tree = renderer.create(<RouteInfo title="title" vehicleType={3} vehicleLine="506" vehicleDestination="Meilahti" vehicleMinutesLeft="5 min" />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly as a bus with minutesLeft as strings.now', () => {
        const tree = renderer.create(<RouteInfo title="title" vehicleType={3} vehicleLine="506" vehicleDestination="Meilahti" vehicleMinutesLeft={strings.now} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});


describe('RouteInfoForStop component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<RouteInfoForStop stopName="HSL" stopCode="123" vehicleMinutesLeft="5 min" />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with minutesLeft as strings.now', () => {
        const tree = renderer.create(<RouteInfoForStop stopName="HSL" stopCode="123" vehicleMinutesLeft={strings.now} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
