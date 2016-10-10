import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { sendStoprequest } from '../actions/sendStoprequest'
import { SlideButton } from 'react-native-slide-button'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class StopRequestView extends Component{
    constructor(props)
    {
        super(props)
        this.state = {renderConfirm: true}
    }

    componentWillReceiveProps = (nextProps) =>
    {
        this.setState({renderConfirm: !nextProps.sent})
    }

    renderCancel = () =>
    {
        const sendStoprequest = () => this.props.sendStoprequest(this.props.vehicle.vehicle_id, this.props.stop.stopId, 'stop')
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
              <View style={{width: undefined, height: 80, backgroundColor: '#DC0451'}}>
                <SlideButton
                 onSlideSuccess={sendStoprequest}>
                  <View style={{height: 80, width: Dimensions.get('window').width}}>
                    <Text style={styles.sliderText}>Slide</Text>
                  </View>
                </SlideButton>
              </View>
            )
        }
        else
        {
            return (
              <View style={{width: undefined, height: 80, backgroundColor: '#64BE14'}}>
                <Text style={styles.confirmedText}>{strings.stopsent}</Text>
              </View>
            )
        }
    }

    render()
    {
        const goBack = () => Actions.departures()
        const vehicleTypes = 'tram metro train bus ferry'.split(' ')

        return (
          <View style={styles.stopRequestStyle}>
            <View>
              <Text style={styles.busStopsAtText}>{strings[vehicleTypes[this.props.vehicle.vehicle_type]]} {this.props.vehicle.line} to {this.props.vehicle.destination} {strings.stopsAt} {this.props.stop.stopName} ({this.props.stop.stopId})</Text>
              <TouchableOpacity onPress={goBack}>
                <Text style={styles.backText}>{strings.back}</Text>
              </TouchableOpacity>
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
        sendStoprequest: (bus_id, stop_id, request_type) => {
            dispatch(sendStoprequest(bus_id, stop_id, request_type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StopRequestView)
