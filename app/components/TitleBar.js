import React, { Component } from 'react'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class TitleBar extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
    }

    render()
    {
        return (<DefaultText style={styles.title}>{this.props.title}</DefaultText>)
    }
}

TitleBar.propTypes = {title: React.PropTypes.string.isRequired}

export default TitleBar
