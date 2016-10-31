import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

class AccessibilityView extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}
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
    scene: React.PropTypes.object,
    name: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps)(AccessibilityView)
