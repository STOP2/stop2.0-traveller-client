import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from '../styles/stylesheet';

export const DefaultText = ({ style, children }) => (
        <Text style={[styles.defaultText, style]}>{children}</Text>
);

DefaultText.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
};

export const BoldText = ({ style, children }) => (
    <Text style={[styles.boldText, style]}>{children}</Text>
);

BoldText.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
};
