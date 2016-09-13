import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import BusListView from '../components/BusListView';

class TravellerApp extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <BusListView/>
    )
  }
}

const mapStateProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{

  }
}

export default connect(mapStateProps, mapDispatchToProps)(TravellerApp);
