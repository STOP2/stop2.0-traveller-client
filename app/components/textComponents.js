import React, { Component } from 'react'
import { Text } from 'react-native'

import styles from '../styles/stylesheet'

export class DefaultText extends Component {
    render()
    {
        return (
          <Text style={this.props.style}>
            <Text style={styles.defaultText}>{this.props.children}</Text>
          </Text>
        )
    }
}

DefaultText.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.number
}
