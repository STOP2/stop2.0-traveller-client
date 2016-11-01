import React, { Component } from 'react'
import { connect } from 'react-redux'
import FCM from 'react-native-fcm'

import { setFCMToken } from '../actions/fcmActions'

class PushController extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount()
    {
        FCM.getFCMToken().then(token =>
        {
            this.props.setFCMToken(token)
        })

        this.notificationUnsubscribe = FCM.on('notification', (notification) =>
        {

        })

        this.refreshUnsubscribe = FCM.on('refreshToken', (token) =>
        {
            this.props.setFCMToken(token)
        })
    }

    componentWillUnmount()
    {
        this.refreshUnsubscribe()
        this.notificationUnsubscribe()
    }

    render()
    {
        return null
    }
}


PushController.propTypes = {
    setFCMToken: React.PropTypes.func
}

const mapStateToProps = () =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setFCMToken: (token) =>
        {
            dispatch(setFCMToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PushController)