import React, { Component } from 'react'
import { Text } from 'react-native'

import styles from '../styles/stylesheet'

class TitleBar extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

    render()
    {
        return (<Text style={styles.title}>{this.props.title}</Text>)
    }
}

TitleBar.propTypes = {title: React.PropTypes.string.isRequired}

export default TitleBar
