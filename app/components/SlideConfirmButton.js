import React, { Component } from 'react'
import { View } from 'react-native'
import { SlideButton } from 'react-native-slide-button'
import { BoldText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class SlideConfirmButton extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

    render()
    {
        return (
        <View style={styles.sliderBackgroundRed}>
          <SlideButton width={500} height={80}
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
