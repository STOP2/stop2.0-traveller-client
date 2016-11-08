import React, { Component } from 'react'
import {  TouchableOpacity, Image } from 'react-native'
import { BoldText } from '../components/textComponents'
import styles from '../styles/stylesheet'

class StartButton extends Component {
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
          <TouchableOpacity accessibilityComponentType="button" accessibilityLabel={this.props.buttonText} style={this.props.style} onPress={this.props.onPress}>
            <Image style={this.props.imageStyle} source={this.props.image}></Image>
            <BoldText style={styles.startText}>{this.props.buttonText}</BoldText>
          </TouchableOpacity>
        )
    }
}

StartButton.propTypes = {
    image: React.PropTypes.number.isRequired,
    buttonText: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    style: React.PropTypes.object.isRequired,
    imageStyle: React.PropTypes.object.isRequired
}


export default StartButton
