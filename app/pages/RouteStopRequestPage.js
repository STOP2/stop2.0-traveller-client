import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'

import SlideConfirmButton from '../components/SlideConfirmButton'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class RouteStopRequestPage extends Component {
    constructor(props)
    {
        super(props)
        this.state = {renderConfirm: true}
    }

    componentWillReceiveProps = (nextProps) =>
    {
        this.setState({renderConfirm: !nextProps.sent})
    }

    renderSlider = () =>
    {
        const sendStoprequest = () =>
        {
            this.props.sendStoprequest(this.props.vehicle.trip_id, this.props.stop.stopId, 'stop')
        }

        if (this.state.renderConfirm)
        {
            return (<SlideConfirmButton onSlideSuccess={sendStoprequest} text={strings.slide} />)
        }
        else
        {
            return (
                <View style={styles.sliderBackgroundGreen}>
                  <DefaultText style={styles.confirmedText}>{strings.stopsent}</DefaultText>
                </View>
            )
        }
    }

    render()
    {
        return (
            <View>
              <DefaultText>Heloooo</DefaultText>
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

RouteStopRequestPage.propTypes = {
    sendStoprequest: React.PropTypes.func.isRequired,
    vehicle: React.PropTypes.shape({trip_id: React.PropTypes.number.isRequired}),
    stop: React.PropTypes.shape({stopId: React.PropTypes.number.isRequired})
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
