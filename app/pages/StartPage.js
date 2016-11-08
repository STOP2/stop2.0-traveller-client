import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, TouchableOpacity } from 'react-native'
import { checkPermission, requestPermission } from 'react-native-android-permissions'

import { DefaultText } from '../components/textComponents'
import styles from '../styles/stylesheet'
import strings from '../resources/translations'

import StartViewButtons from '../components/StartViewButtons'
import AccessibilityView from '../components/AccessibilityView'

class StartView extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            locationPermissionsError: false
        }
    }

    componentWillMount = () =>
    {
        checkPermission('android.permission.ACCESS_FINE_LOCATION').then(() =>
        {
            this.props.getLocation()
        }, () =>
        {
            setTimeout(() =>
            {
                requestPermission('android.permission.ACCESS_FINE_LOCATION').then(() =>
            {
                    this.props.getLocation()
                }, () =>
            {
                    this.setState({locationPermissionsError: true})
                })
          // for the correct StatusBar behaviour with translucent={true} we need to wait a bit and ask for permission after the first render cycle
          // (check https://github.com/facebook/react-native/issues/9413 for more info)
            }, 0)
        })
    }
    
    render()
    {
        let viewElement

        if (this.state.locationPermissionsError)
        {
            viewElement = <View>
                          <DefaultText style={styles.locationErrorText}>{strings.locationPermissionsError}</DefaultText>
                        </View>
        }
        else if (this.props.locationError)
            {
            viewElement = <View>
                              <DefaultText style={styles.locationErrorText}>{strings.locationError}</DefaultText>
                              <TouchableOpacity onPress={this.props.getLocation} accessibilityComponentType="button" accessibilityLabel={strings.tryAgain}>
                                <DefaultText style={styles.tryAgain}>{strings.tryAgain}</DefaultText>
                              </TouchableOpacity>
                            </View>
        }
        else if (this.props.gettingLocation == false)
        {
            viewElement = <StartViewButtons />
        }
        else
        {
            viewElement = <View><DefaultText style={styles.gettingLocationText}>{strings.gettingLocation}</DefaultText><ActivityIndicator /></View>
        }


        return (
      <AccessibilityView style={styles.start} name="start">
        {viewElement}
      </AccessibilityView>
        )
    }
}

StartView.propTypes = {
    gettingLocation: React.PropTypes.bool.isRequired,
    locationError: React.PropTypes.string,
    getLocation: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) =>
{
    return {
        gettingLocation: state.locationReducer.gettingLocation,
        locationError: state.locationReducer.error
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getLocation: () =>
        {
            dispatch(getLocation())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartView)
