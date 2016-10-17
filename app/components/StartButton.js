import React, { Component } from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import styles from '../styles/stylesheet'

class StartButton extends Component {
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
          <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
            <Image style={this.props.imageStyle} source={this.props.image}></Image>
            <Text style={styles.startText}>{this.props.buttonText}</Text>
          </TouchableOpacity>
        )
    }
}

StartButton.propTypes = {
    image: React.PropTypes.number.isRequired,
    buttonText: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    style: React.PropTypes.number.isRequired,
    imageStyle: React.PropTypes.number.isRequired
}


export default StartButton
