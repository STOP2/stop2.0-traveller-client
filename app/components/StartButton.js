import React, { Component } from 'react';
import {  TouchableOpacity, Image } from 'react-native';
import { BoldText } from '../components/textComponents';
import styles from '../styles/stylesheet';

const StartButton = ({ buttonText, style, imageStyle, onPress, image }) => (
    <TouchableOpacity accessibilityComponentType="button" accessibilityLabel={buttonText} style={style} onPress={onPress}>
        <Image style={imageStyle} source={image}></Image>
        <BoldText style={styles.startText}>{buttonText}</BoldText>
    </TouchableOpacity>
);

StartButton.propTypes = {
    image: React.PropTypes.number.isRequired,
    buttonText: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    style: React.PropTypes.object.isRequired,
    imageStyle: React.PropTypes.object.isRequired,
};


export default StartButton;
