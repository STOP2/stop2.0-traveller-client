import StopRequestView from '../components/StopRequestView';

import React, { Component } from 'react'

class StopRequestPage extends Component{
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <StopRequestView {...this.props} />
    )
  }
}

export default StopRequestPage;
