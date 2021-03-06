import React, { Component } from 'react';
import { connect } from 'react-redux';
import FCM from 'react-native-fcm';

import strings from '../resources/translations';

import { setFCMToken } from '../actions/fcmActions';

class PushController extends Component {
  componentDidMount() {
    FCM.getFCMToken().then((token) => {
      this.props.setFCMToken(token);
    });

    this.notificationUnsubscribe = FCM.on('notification', (notification) => {
      if (!notification.local_notification && !notification.opened_from_tray) {
        const vehicleType = (this.props.vehicleType === 0 ? strings.tram : strings.bus);
        const body = `${vehicleType} ${this.props.vehicleLine} ${strings.arrivesShortly}`;
        FCM.presentLocalNotification({
          id: 'UNIQ_ID_STRING',                     // (optional for instant notification)
          title: strings.arrivalNotificationTitle,  // FCM payload
          body,                                     // FCM payload (required)
          sound: 'default',                         // FCM payload
          priority: 'high',                         // FCM payload
          click_action: 'ACTION',                   // FCM payload
          badge: 10,                                // FCM payload IOS only, set 0 to clear badges
          number: 10,                               // Android only
          ticker: 'My Notification Ticker',         // Android only
          auto_cancel: true,                        // Android only (default true)
          /* large_icon: 'ic_launcher',                // Android only
          icon: 'ic_notification',                  // FCM payload */
          big_text: body,                           // Android only
          sub_text: 'Stop2',                        // Android only
          color: 'blue',                            // Android only
          vibrate: 300,                             // Android only default: 300,
                                                    // no vibration if you pass null
          tag: 'some_tag',                          // Android only
          group: 'group',                           // Android only
          my_custom_data: 'my_custom_field_value',  // extra data you want to throw
          lights: true,                             // Android only, LED blinking (default false)
          show_in_foreground: true,                 // notification when app is in foreground
                                                    // (local & remote)
        });
      }
    });

    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      this.props.setFCMToken(token);
    });
  }

  componentWillUnmount() {
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() {
    return null;
  }
}

PushController.propTypes = {
  setFCMToken: React.PropTypes.func,
  vehicleType: React.PropTypes.number,
  vehicleLine: React.PropTypes.string,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  setFCMToken: (token) => {
    dispatch(setFCMToken(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PushController);
