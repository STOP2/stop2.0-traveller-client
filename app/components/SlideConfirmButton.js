import React, { Component } from 'react'
import { View } from 'react-native'
import { SlideButton, SlideDirection } from 'react-native-slide-button'
import { BoldText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class SlideConfirmButton extends Component {
    render()
    {
        return (
        <View style={this.props.mode == 'stop' ? styles.sliderBackgroundGreen : styles.sliderBackgroundRed} accessibilityComponentType="button" accessibilityLabel={this.props.text}>
          <SlideButton slideDirection={this.props.mode == 'stop' ? SlideDirection.RIGHT : SlideDirection.LEFT} width={500} height={80}
           onSlideSuccess={this.props.onSlideSuccess}>
            <View style={styles.sliderTextContainer}>
              <BoldText style={styles.sliderText}>{this.props.text}</BoldText>
            </View>
          </SlideButton>
        </View>)
    }
}

SlideConfirmButton.propTypes = {
    onSlideSuccess: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired
}

export default SlideConfirmButton
