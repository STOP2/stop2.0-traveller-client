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
            busUuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
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
            await Beacons.startRangingBeaconsInRegion('STOPS', this.beacons[0].id)
            await Beacons.startRangingBeaconsInRegion('BUSSES', this.beacons[0].busUuid)
        }
        catch (error)
        {
        }

        // Print a log of the detected iBeacons (1 per 5 second)
        DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
        {
            console.log(data)
            if (this.state.attempts == 5)
            {
                Beacons.stopRangingBeaconsInRegion('STOPS', this.beacons[0].id)
                Beacons.stopRangingBeaconsInRegion('BUSSES', this.beacons[0].busUuid)
                this.props.beaconError('Beacon not found in 5 seconds')
            }
            if (data.beacons.length > 0)
            {
                if (!this.state.beaconDetected)
                {
                    let closestBeaconIndex = 0
                    let closestBeaconDistance = 999999

                    for (let beaconIndex in data.beacons)
                    {
                        if (data.beacons[beaconIndex].distance < closestBeaconDistance)
                        {
                            closestBeaconIndex = beaconIndex
                        }
                    }
                    let beaconData = {
                        uuid: data.beacons[closestBeaconIndex].uuid,
                        major: data.beacons[closestBeaconIndex].major,
                        minor: data.beacons[closestBeaconIndex].minor
                    }

                    if (beaconData.uuid == this.beacons[0].id)
                    {
                        this.props.setBeaconData(beaconData)
                        Beacons.stopRangingBeaconsInRegion('STOPS', this.beacons[0].id)
                    }
                    else
                    {
                        this.props.setBusBeaconData(beaconData)
                        Beacons.stopRangingBeaconsInRegion('BUSSES', this.beacons[0].busUuid)
                    }
                    // alert('Olet pysäkillä Pasilan asema (2181)')
                    this.setState({beaconDetected: true})
                }
            }
            else
            {
                if (this.state.beaconDetected)
                {
                    this.setState({beaconDetected: false})
                }
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
    setBusBeaconData: React.PropTypes.func,
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
