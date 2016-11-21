import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { sendStoprequest } from '../actions/sendStoprequest'

import { BoldTitleBar } from '../components/TitleBar'

import SlideConfirmButton from '../components/SlideConfirmButton'
import AccessibilityView from '../components/AccessibilityView'
import {DefaultText} from '../components/textComponents'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class RouteStopRequestPage extends Component{
    constructor()
    {
        super()

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
            <AccessibilityView name="routeStopRequest">
                <BoldTitleBar title={strings.stopRequest}/>
                <DefaultText>Heloooo</DefaultText>
            </AccessibilityView>
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
    sent: React.PropTypes.bool,
    sendStoprequest: React.PropTypes.func,
    vehicle: React.PropTypes.object,
    stop: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteStopRequestPage)
