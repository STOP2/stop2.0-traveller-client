import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import BusListPage from '../pages/BusListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPageIos from '../pages/StartPageIos'
import RouteStopsPage from '../pages/RouteStopsPage'
import RouteStopRequestPage from '../pages/RouteStopRequestPage'

import strings from '../resources/translations'
import styles from '../styles/stylesheet'

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const scenes = Actions.create(
            <Scene key="root" hideNavBar={true} panHandlers={null}>
                <Scene key="start" component={StartPageIos} initial={true}/>
                <Scene key="departures" component={BusListPage}/>
                <Scene key="stopRequest" component={StopRequestPage}/>
                <Scene key="routeStops" component={RouteStopsPage}/>
                <Scene key="routeStopRequest" component={RouteStopRequestPage}/>
            </Scene>
        )

        return (<RouterWithRedux scenes={scenes} />)
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