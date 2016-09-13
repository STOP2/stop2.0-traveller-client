import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';
import styles from '../styles/stylesheet';


class BusListView extends Component{
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([{type:'bus', line:55, destination:'Rautatieasema', leaves:'3 min'},{type:'bus', line:506,destination:'Viikki', leaves:'4 min'}]),
    }

  }

renderRow(renderData) {
  return (
    <View style= {styles.busrow}>
    <Text style= {{flex:1}}>{renderData.type}</Text>
    <Text style= {{flex:1}}>{renderData.line}</Text>
    <Text style= {{flex:4, color:'black'}}>{renderData.destination}</Text>
    <Text style= {{flex:1, color:'black'}}>{renderData.leaves}</Text>
    </View>
  )
}

renderHeader() {
  return (
    <View style= {styles.busrowheader}>
    <Text style= {{flex:1}}>Tyyppi</Text>
    <Text style= {{flex:1}}>Linja</Text>
    <Text style= {{flex:4}}>Määränpää</Text>
    <Text style= {{flex:1}}>Lähtee</Text>
    </View>
  )
}

  render() {
    return (
      <View>
        <Text style={styles.title}>Busseja pysäkiltä 3029</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
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
