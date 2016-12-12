import React, { Component } from 'react';
import { View } from 'react-native';
import { DefaultText, BoldText } from '../components/textComponents';

import styles from '../styles/stylesheet';

export class TitleBar extends Component {
  render() {
    return (
      <DefaultText style={styles.title}>{this.props.title}</DefaultText>
    );
  }
}

TitleBar.propTypes = { title: React.PropTypes.string.isRequired };

export class BoldTitleBar extends Component {
  render() {
    let viewStyle;

    if (this.props.noBorder) {
      viewStyle = styles.mainTitleCont;
    } else {
      viewStyle = [styles.mainTitleCont, styles.bottomBorder];
    }

    return (
      <View style={viewStyle}>
        <BoldText style={styles.mainTitle}>{this.props.title}</BoldText>
      </View>
    );
  }
}

BoldTitleBar.defaultProps = { noBorder: false };

BoldTitleBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  noBorder: React.PropTypes.bool,
};
