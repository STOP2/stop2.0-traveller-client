import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';
import styles from '../styles/stylesheet';


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
    <View style= {styles.busrow}>
    <Text>{renderData.type}</Text>
    <Text>{renderData.line}</Text>
    <Text>{renderData.destination}</Text>
    <Text>3min</Text>
    </View>
  )
}

  render() {
    return (
      <View>
        <Text style={styles.title}>Busseja pysäkiltä 3029</Text>
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
