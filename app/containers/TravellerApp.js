import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'

import { Router, Scene } from 'react-native-router-flux'

import BusListView from '../components/BusListView';
import StopRequestView from '../components/StopRequestView';

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="departures" component={BusListView} initial={true} />
          <Scene key="stopRequest" component={StopRequestView} />
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
