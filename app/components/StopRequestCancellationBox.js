import React, { Component } from 'react'
import { View } from 'react-native'
import AwesomeButton from 'react-native-awesome-button'

import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'
import colors from '../styles/colors'
import strings from '../resources/translations'

class StopRequestCancellationBox extends Component {
    render()
    {
        return (<View style={styles.stopRequestSentBackground}>
            <DefaultText style={styles.stopRequestSentText}>{this.props.supportsStopRequest ? strings.stopsent : strings.weWillNotifyYou} </DefaultText>
            <AwesomeButton labelStyle={styles.buttonLabel} states={{
                default: {
                    text: strings.cancel,
                    onPress: this.props.onPress,
                    backgroundColor: colors.HSLalarmRed
                }
            }} />
        </View>)
    }
}

StopRequestCancellationBox.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    supportsStopRequest: React.PropTypes.bool.isRequired
}

export default StopRequestCancellationBox
