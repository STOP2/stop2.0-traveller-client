import React, { Component } from 'react';
import { Image } from 'react-native';

export default class VehicleImage extends Component {
  constructor() {
    super();

    this.icons = {
      tram: require('../resources/icons/hsl_reittiopas_tram.png'),
      bus: require('../resources/icons/hsl_reittiopas_bus.png'),
    };
  }

  render() {
    let imageSource;

    if (this.props.vehicleType === 0) {
      imageSource = this.icons.tram;
    } else {
      imageSource = this.icons.bus;
    }

    return (
      <Image
        style={this.props.style}
        resizeMode="contain"
        source={imageSource}
      />
    );
  }
}

VehicleImage.propTypes = {
  vehicleType: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
};
