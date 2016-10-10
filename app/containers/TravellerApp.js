import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Router, Scene } from 'react-native-router-flux'
import { Alert } from 'react-native'

import BusListPage from '../pages/BusListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPage from '../pages/StartPage'

const RouterWithRedux = connect()(Router)

class TravellerApp extends Component {
    constructor(props)
    {
        super(props)
    }

    render() {
      const routeStackIds = this.props.navigator.state.routeStack.map((route)=> route.id);
      const presentedIndex = _.indexOf(routeStackIds, this.props.route.id);
      Alert("jee1", presentedIndex)
      return(
        <RouterWithRedux backAndroidHandler={backAndroidHandle}>
          <Scene key="root" hideNavBar={true} panHandlers={null}>
            <Scene key="start" component={StartPage} initial={true} panHandlers={null}/>
            <Scene key="departures" component={BusListPage} panHandlers={null}/>
            <Scene key="stopRequest" component={StopRequestPage} type="replace" panHandlers={null}/>
          </Scene>
        </RouterWithRedux>
      )
    }
  }

  const backAndroidHandle = () => {
    const routeStackIds = this.props.navigator.state.routeStack.map((route)=> route.id);
    const presentedIndex = _.indexOf(routeStackIds, this.props.route.id);
    Alert("jee2", presentedIndex)
      if (presentedIndex==1){
      return true
    }
    else {
      return true
    }
  };


const mapStateProps = (state) =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {}
}

export default connect(mapStateProps, mapDispatchToProps)(TravellerApp)
