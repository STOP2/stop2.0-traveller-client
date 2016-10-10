import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'
import { SlideButton } from 'react-native-slide-button'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StopRequestView extends Component{
    constructor(props)
    {
        super(props)

        this.state = {renderConfirm: true}

        this.iconTram = require('../resources/icons/hsl_reittiopas_tram.png')
        this.iconBus = require('../resources/icons/hsl_reittiopas_bus.png')
    }

    componentWillReceiveProps = (nextProps) =>
    {
        this.setState({renderConfirm: !nextProps.sent})
    }

    renderCancel = () =>
    {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle.vehicle_id, this.props.stop.stopId, 'stop')
        }

        if (this.state.renderConfirm)
        {
            /* return (
              <View>
                <TouchableOpacity onPress={sendStoprequest} style={styles.button}>
                  <Text style={styles.confirmText}>{strings.confirm}</Text>
                </TouchableOpacity>
              </View>

            );*/
            return (
              <View style={styles.sliderBackgroundRed}>
                <SlideButton
                 onSlideSuccess={sendStoprequest}>
                  <View style={styles.sliderTextContainer}>
                    <Text style={styles.sliderText}>{strings.slide}</Text>
                  </View>
                </SlideButton>
              </View>
            )
        }
        else
        {
            return (
              <View style={styles.sliderBackgroundGreen}>
                <Text style={styles.confirmedText}>{strings.stopsent}</Text>
              </View>
            )
        }
    }

    render()
    {
        const vehicleTypes = 'tram metro train bus ferry'.split(' ')

        return (
          <View style={styles.flex1}>
            <Text style={styles.title}>{this.props.stop.stopName} ({this.props.stop.stopId})</Text>
            <View style={styles.stopRequestStyle}>
              <View style={styles.pysaytetaankoWrapper}>
                <Text style={styles.pysaytetaanko}>Pysäytetäänkö</Text>
              </View>
              <View style={styles.flexRow}>
                <Image style={styles.busIcon} resizeMode="contain"
                source={this.props.vehicle.vehicle_type == 0 ? this.iconTram : this.iconBus}/>
                <View style={styles.vehicleInfoWrapper}>
                  <Text style={styles.vehicleInfo}>{this.props.vehicle.line} {this.props.vehicle.destination}</Text>
                </View>
              </View>
            </View>

            {this.renderCancel()}
          </View>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {sent: state.fetchReducer.sentStoprequest}
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        sendStoprequest: (busId, stopId, requestType) =>
        {
            dispatch(sendStoprequest(busId, stopId, requestType))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestView)
