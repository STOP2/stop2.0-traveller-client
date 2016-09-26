import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'

import { Router, Scene } from 'react-native-router-flux'

import BusListView from '../components/BusListView';
import StopRequestView from '../components/StopRequestView';
import StartView from '../components/StartView';

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="start" component={StartView} initial={true} />
          <Scene key="departures" component={BusListView} />
          <Scene key="stopRequest" component={StopRequestView} type="replace" />
        </Scene>
      </RouterWithRedux>
    )
  }
}

const mapStateProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateProps, mapDispatchToProps)(TravellerApp)
