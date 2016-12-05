import React, { Component } from 'react';
import { DefaultText } from '../components/textComponents';

import styles from '../styles/stylesheet';

const StopTitle = ({ name, line, distance }) => (
    <DefaultText style={styles.stopTitle}>
        {name} ({line}) — {distance} m
    </DefaultText>
);

StopTitle.propTypes = {
    name: React.PropTypes.string.isRequired,
    line: React.PropTypes.string.isRequired,
    distance: React.PropTypes.number.isRequired,
};

export default StopTitle;
