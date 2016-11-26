import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-android'

import  { setLocation } from '../actions/locationActions'

const FOREGROUND_SCAN_PERIOD = 5000
const BACKGROUND_SCAN_PERIOD = 5000

class BeaconController extends Component {
    constructor(props)
    {
        super(props)

        this.state = {beaconDetected: false }

        this.beacons = [{
            id: 'ebefd083-70a2-47c8-9837-e7b5634df524',
            latitude: 60.19942,
            longitude: 24.93461
        }]
    }

    async getBeacons()
    {
        Beacons.detectIBeacons()
        Beacons.setForegroundScanPeriod(FOREGROUND_SCAN_PERIOD)
        Beacons.setBackgroundScanPeriod(BACKGROUND_SCAN_PERIOD)

        try
        {
            await Beacons.startRangingBeaconsInRegion('REGION1', this.beacons[0].id)
            console.log('Beacons ranging started succesfully!')
        }
        catch (error)
        {
            console.log(`Beacons ranging not started, error: ${error}`)
        }

        // Print a log of the detected iBeacons (1 per second)
        DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
        {
            console.log(data)
            if (data.beacons.length > 0)
{
                if (!this.state.beaconDetected)
{
                    this.props.setLocation({latitude: this.beacons[0].latitude, longitude: this.beacons[0].longitude})

                    alert('Olet pysäkillä Pasilan asema (2181)')
                }
                this.setState({beaconDetected: true})
            }
            else
{
                if (this.state.beaconDetected)
                    alert('Poistuit pysäkiltä Pasilan asema (2181)')
                this.setState({beaconDetected: false})
            }
        })
    }

    componentWillMount()
{
        this.getBeacons()
    }

    render()
    {
        return null
    }
}


BeaconController.propTypes = {setLocation: React.PropTypes.func}

const mapStateToProps = () =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setLocation: (coords) =>
        {
            dispatch(setLocation(coords))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeaconController)
