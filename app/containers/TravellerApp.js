import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class TravellerApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Text>Mo</Text>
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
