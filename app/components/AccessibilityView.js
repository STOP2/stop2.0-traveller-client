import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

const AccessibilityView = ({ style, scene, name, children }) => (
    <View style={style} importantForAccessibility={scene.name == name ? 'yes' : 'no-hide-descendants'}>
        {children}
    </View>
);

const mapStateToProps = (state) => {
    return { scene: state.routes.scene };
};

AccessibilityView.propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    scene: React.PropTypes.shape({ name: React.PropTypes.string.isRequired }),
};

export default connect(mapStateToProps)(AccessibilityView);
