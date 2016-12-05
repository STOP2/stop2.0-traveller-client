import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'

import colors from '../styles/colors'

export class AccessibilityView extends Component {
    componentWillMount() {
        StatusBar.setBackgroundColor(colors.statusBar)
    }

    render()
    {
        return (
            <View style={this.props.style} importantForAccessibility={this.props.scene.name == this.props.name ? 'yes' : 'no-hide-descendants'}>
                {this.props.children}
            </View>)
    }
}

const mapStateToProps = (state) =>
{
    return {scene: state.routes.scene}
}

AccessibilityView.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    scene: React.PropTypes.shape({name: React.PropTypes.string.isRequired})
}

export default connect(mapStateToProps)(AccessibilityView)
