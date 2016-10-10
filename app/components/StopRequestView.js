import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
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
              <View style={{width: undefined, height: 100, backgroundColor: '#DC0451'}}>
                <SlideButton
                 onSlideSuccess={sendStoprequest}>
                  <View style={{height: 100, width: Dimensions.get('window').width}}>
                    <Text style={styles.sliderText}>Slide</Text>
                  </View>
                </SlideButton>
              </View>
            )
        }
        else
        {
            return (
              <View style={{width: undefined, height: 100, backgroundColor: '#64BE14'}}>
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
          <View style={{flex: 1}}>
            <Text style={styles.title}>{this.props.stop.stopName} ({this.props.stop.stopId})</Text>

            <View style={styles.stopRequestStyle}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 40,
                textAlign: 'center',
                fontFamily: 'gotham-rounded-book'}}>Pysäytetäänkö</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image style={{width: 50, height: 50}} resizeMode="contain"
                source={this.props.vehicle.vehicle_type == 0 ? this.iconTram : this.iconBus}/>
                <View style={{marginLeft: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20,
                  textAlign: 'center',
                  fontFamily: 'gotham-rounded-book'}}>{this.props.vehicle.line} {this.props.vehicle.destination}</Text>
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
