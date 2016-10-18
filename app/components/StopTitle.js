import React, { Component } from 'react'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class StopTitle extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

    render()
    {
        return (<DefaultText style={styles.stopTitle}>{this.props.name} ({this.props.line})</DefaultText>)
    }
}

StopTitle.propTypes = {
    name: React.PropTypes.string.isRequired,
    line: React.PropTypes.string.isRequired
}

export default StopTitle
