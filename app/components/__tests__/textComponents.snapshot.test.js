import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { DefaultText, BoldText } from '../textComponents';

import styles from '../../styles/stylesheet';

jest.mock('react-native-localization');

describe('DefaultText component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DefaultText style={styles.padding10}>x</DefaultText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('BoldText component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BoldText style={styles.padding10}>x</BoldText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
