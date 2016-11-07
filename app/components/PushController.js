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
            if(!notification.local_notification && !notification.opened_from_tray) {
                FCM.presentLocalNotification({
                    id: "UNIQ_ID_STRING",                               // (optional for instant notification)
                    title: "My Notification Title",                     // as FCM payload
                    body: "My Notification Message",                    // as FCM payload (required)
                    sound: "default",                                   // as FCM payload
                    priority: "high",                                   // as FCM payload
                    click_action: "ACTION",                             // as FCM payload
                    badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
                    number: 10,                                         // Android only
                    ticker: "My Notification Ticker",                   // Android only
                    auto_cancel: true,                                  // Android only (default true)
                    /*large_icon: "ic_launcher",                           // Android only
                     icon: "ic_notification",                            // as FCM payload*/
                    big_text: "Show when notification is expanded",     // Android only
                    sub_text: "This is a subText",                      // Android only
                    color: "red",                                       // Android only
                    vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
                    tag: 'some_tag',                                    // Android only
                    group: "group",                                     // Android only
                    my_custom_data:'my_custom_field_value',             // extra data you want to throw
                    lights: true,                                       // Android only, LED blinking (default false)
                    show_in_foreground: true                                  // notification when app is in foreground (local & remote)
                });
            }
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