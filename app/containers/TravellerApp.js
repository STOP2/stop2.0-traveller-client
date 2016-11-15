import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import BusListPage from '../pages/BusListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPage from '../pages/StartPage'
import RouteStopsPage from '../pages/RouteStopsPage'
import RouteStopRequestPage from '../pages/RouteStopRequestPage'

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
    render()
    {
        const scenes = Actions.create(
            <Scene key="root" hideNavBar={true} panHandlers={null}>
                <Scene key="start" component={StartPage} initial={true}/>
                <Scene key="departures" component={BusListPage}/>
                <Scene key="stopRequest" component={StopRequestPage}/>
                <Scene key="routeStops" component={RouteStopsPage}/>
                <Scene key="routeStopRequest" component={RouteStopRequestPage}/>
            </Scene>
        )

        return (<RouterWithRedux scenes={scenes} />)
    }
}

export default TravellerApp
