import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-android'

import  { setBeaconData, beaconError, requestBeaconData } from '../actions/beaconLocationActions'

const FOREGROUND_SCAN_PERIOD = 1000
const BACKGROUND_SCAN_PERIOD = 1000

class BeaconController extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            beaconDetected: false,
            attempts: 0
        }

        this.beacons = [{
            id: 'ebefd083-70a2-47c8-9837-e7b5634df524',
            latitude: 60.19942,
            longitude: 24.93461
        }]
    }

    async getBeacons()
    {
        this.props.requestBeaconData()
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

        // Print a log of the detected iBeacons (1 per 5 second)
        DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
        {
            console.log(data)

            if (this.state.attempts == 5)
            {
                Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id)
                this.props.beaconError('Beacon not found in 5 seconds')
            }
            if (data.beacons.length > 0)
            {
                if (!this.state.beaconDetected)
                {
                    let beaconData = {
                        major: data.beacons[0].major,
                        minor: data.beacons[0].minor
                    }

                    this.props.setBeaconData(beaconData)
                    Beacons.stopRangingBeaconsInRegion('REGION1', this.beacons[0].id)
                    // alert('Olet pysäkillä Pasilan asema (2181)')
                    this.setState({beaconDetected: true})
                }
            }
            else
            {
                if (this.state.beaconDetected)
                    // alert('Poistuit pysäkiltä Pasilan asema (2181)')
                this.setState({beaconDetected: false})
            }
            this.setState({attempts: this.state.attempts + 1})
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


BeaconController.propTypes = {
    setBeaconData: React.PropTypes.func,
    beaconError: React.PropTypes.func,
    requestBeaconData: React.PropTypes.func
}

const mapStateToProps = () =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setBeaconData: (beaconData) =>
        {
            dispatch(setBeaconData(beaconData))
        },
        beaconError: (error) =>
        {
            dispatch(beaconError(error))
        },
        requestBeaconData: () =>
        {
            dispatch(requestBeaconData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeaconController)
