import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene, Actions } from 'react-native-router-flux'
import DeparturesListPage from '../pages/DeparturesListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPage from '../pages/StartPage'
import RouteStopsPage from '../pages/RouteStopsPage'
import RouteStopRequestPage from '../pages/RouteStopRequestPage'

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
    render()
    {
        const scenes = Actions.create(
            <Scene key="root" hideNavBar={true}>
                <Scene key="start" component={StartPage} initial={true} panHandlers={null} type="reset"/>
                <Scene key="departures" component={DeparturesListPage} panHandlers={null}/>
                <Scene key="stopRequest" component={StopRequestPage} panHandlers={null}/>
                <Scene key="routeStops" component={RouteStopsPage} panHandlers={null}/>
                <Scene key="routeStopRequest" component={RouteStopRequestPage} panHandlers={null}/>
            </Scene>
        )

        return (<RouterWithRedux scenes={scenes} />)
    }
}

export default TravellerApp
