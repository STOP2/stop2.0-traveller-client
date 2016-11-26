import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import DeparturesListPage from '../pages/DeparturesListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPageIos from '../pages/StartPageIos'
import RouteStopsPage from '../pages/RouteStopsPage'
import RouteStopRequestPage from '../pages/RouteStopRequestPage'

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
    render()
    {
        const scenes = Actions.create(
            <Scene key="root" hideNavBar={true} panHandlers={null}>
                <Scene key="start" component={StartPageIos} initial={true}/>
                <Scene key="departures" component={DeparturesListPage}/>
                <Scene key="stopRequest" component={StopRequestPage}/>
                <Scene key="routeStops" component={RouteStopsPage}/>
                <Scene key="routeStopRequest" component={RouteStopRequestPage}/>
            </Scene>
        )

        return (<RouterWithRedux scenes={scenes} />)
    }
}

export default TravellerApp
