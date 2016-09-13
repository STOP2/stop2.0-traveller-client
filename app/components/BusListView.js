import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';


class BusListView extends Component{
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([{type:'bus', line:55, destination:'Rautatieasema'},{type:'bus', line:506,destination:'Viikki'}]),
    }

  }

renderRow(renderData) {
  return (
    <View style= {{flexDirection: 'row', justifyContent:'space-between'}}>
    <Text>{renderData.type}</Text>
    <Text>{renderData.line}</Text>
    <Text>{renderData.destination}</Text>
    <Text>3min</Text>
    </View>
  )
}

  render() {
    return (
      <View style= {{padding:20}}>
        <Text style= {{fontSize:30}}>Busseja pysäkiltä 3029</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
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

export default connect(mapStateProps, mapDispatchToProps)(BusListView);
