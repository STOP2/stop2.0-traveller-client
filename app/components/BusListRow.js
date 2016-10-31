import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { DefaultText } from '../components/textComponents'

import styles from '../styles/stylesheet'

class BusListRow extends Component {
    constructor(props)
    {
        super(props)

        this.state = {}

        this.vehicleTypes = {
            0: {
                type: 'tram',
                icon: require('../resources/icons/hsl_reittiopas_tram.png')
            },
            1: {type: 'metro'},
            2: {type: 'train'},
            3: {
                type: 'bus',
                icon: require('../resources/icons/hsl_reittiopas_bus.png')
            },
            4: {type: 'ferry'}
        }
    }

    render()
    {
        let vehicleType = this.vehicleTypes[this.props.vehicleType]
        let typeElement

        if ('icon' in vehicleType)
        {
            typeElement = <Image
                            style={styles.busListIcon}
                            resizeMode="contain"
                            source={vehicleType.icon}
                          />
        }
        else
        {
            typeElement = <DefaultText>
                            strings[vehicleTypes[this.props.vehicle.vehicle_type]]
                          </DefaultText>
        }

        return (
          <View style={styles.busrow}>
            <View style={styles.flex1}>
              {typeElement}
            </View>
            <DefaultText style={styles.busrowText}>{this.props.line}</DefaultText>
            <DefaultText style={styles.busrowTextBlack2}>{this.props.destination}</DefaultText>
            <DefaultText style={styles.busrowTextBlack}>{this.props.arrival} min</DefaultText>
          </View>
        )
    }
}

BusListRow.propTypes = {
    vehicleType: React.PropTypes.number.isRequired,
    line: React.PropTypes.string.isRequired,
    destination: React.PropTypes.string.isRequired,
    arrival: React.PropTypes.number.isRequired
}

export default BusListRow
