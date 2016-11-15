import React, { Component } from 'react'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class StopTitle extends Component {
    render()
    {
        return (<DefaultText style={styles.stopTitle}>
                  {this.props.name} ({this.props.line}) — {this.props.distance}m
                </DefaultText>)
    }
}

StopTitle.propTypes = {
    name: React.PropTypes.string.isRequired,
    line: React.PropTypes.string.isRequired,
    distance: React.PropTypes.number.isRequired
}

export default StopTitle
