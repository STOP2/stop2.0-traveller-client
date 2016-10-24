import React, { Component } from 'react'
import { Text } from 'react-native'

import styles from '../styles/stylesheet'

export class DefaultText extends Component {
    render()
    {
        return (<Text style={[styles.defaultText, this.props.style]}>{this.props.children}</Text>)
    }
}

DefaultText.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object
}

export class BoldText extends Component {
    render()
    {
        return (<Text style={[styles.boldText, this.props.style]}>{this.props.children}</Text>)
    }
}

BoldText.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object
}
