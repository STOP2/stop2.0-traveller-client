import React, { Component } from 'react'
import { Navigator, Text } from 'react-native'
import { connect } from 'react-redux'
import BusListPage from '../pages/BusListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPage from '../pages/StartPage'
import RouteStopsPage from '../pages/RouteStopsPage'
import RouteStopRequestPage from '../pages/RouteStopRequestPage'

import strings from '../resources/translations'
import styles from '../styles/stylesheet'

class TravellerApp extends Component {
    constructor(props)
    {
        super(props)
    }

    render() {
        return (
            <Navigator
            initialRoute={{id: 'StartPage'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
                if (route.sceneConfig) {
                    return route.sceneConfig;
                }

                return Navigator.SceneConfigs.FloatFromRight;
            }}/>
        )
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'StartPage':
                return ( <StartPage navigator={navigator}/> )
            case 'BusListPage':
                return ( <BusListPage navigator={navigator}/> )
            default:
                return ( <Text>{route.id}</Text> )
        }
    }
}
const mapStateProps = () =>
{
    return {}
}

const mapDispatchToProps = () =>
{
    return {}
}

export default connect(mapStateProps, mapDispatchToProps)(TravellerApp)
