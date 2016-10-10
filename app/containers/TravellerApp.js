import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Scene } from 'react-native-router-flux'
import BusListPage from '../pages/BusListPage'
import StopRequestPage from '../pages/StopRequestPage'
import StartPage from '../pages/StartPage'

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
        return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="start" component={StartPage} initial={true} hideNavBar={true} panHandlers={null}/>
          <Scene title={strings.chooseVehicle} key="departures" component={BusListPage} panHandlers={null} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} leftButtonIconStyle={styles.backButton} sceneStyle={{paddingTop: 50}} hideNavBar={false}/>
          <Scene title={strings.stopRequest} key="stopRequest" component={StopRequestPage} panHandlers={null} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} leftButtonIconStyle={styles.backButton} sceneStyle={{paddingTop: 50}} hideNavBar={false}/>
        </Scene>
      </RouterWithRedux>
    )
    }
}
const mapStateProps = (state) =>
{
    return {}
}

const mapDispatchToProps = (dispatch) =>
{
    return {}
}

export default connect(mapStateProps, mapDispatchToProps)(TravellerApp)
