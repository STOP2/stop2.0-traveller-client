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
            <View style={this.props.style} importantForAccessibility={this.props.scene.name == this.props.name ?
                'yes' : 'no-hide-descendants'}>
                {this.props.children}
            </View>)
    }
}

const mapStateToProps = (state) =>
{
    return {
        scene: state.routes.scene
    }
}

export default connect(mapStateToProps)(AccessibilityView)