import React, { Component } from 'react';
import { View } from 'react-native';
import { DefaultText, BoldText } from '../components/textComponents';

import styles from '../styles/stylesheet';

const TitleBar = ({ title }) => (
    <DefaultText style={styles.title}>{title}</DefaultText>
);


TitleBar.propTypes = { title: React.PropTypes.string.isRequired };

const BoldTitleBar = ({ noBorder, title }) => (
    <View style={noBorder ? styles.mainTitleCont : [styles.mainTitleCont, styles.bottomBorder]}>
      <BoldText style={styles.mainTitle}>{title}</BoldText>
    </View>
);

BoldTitleBar.defaultProps = { noBorder: false };

BoldTitleBar.propTypes = {
    title: React.PropTypes.string.isRequired,
    noBorder: React.PropTypes.bool,
};
