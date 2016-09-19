import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, ListView, View, TouchableOpacity } from 'react-native'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

class BusListView extends Component{
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    let departureData = [
      {
        vehicleId: 1,
        type:'bus',
        line: 55,
        destination: 'Rautatieasema',
        leaves:3
      },
      {
        vehicleId: 2,
        type: 'bus',
        line: 506,
        destination: 'Viikki',
        leaves:4
      }
    ]

    this.state = {
      dataSource: ds.cloneWithRows(departureData),
    }

  }

  renderRow(renderData) {
    return (
      <TouchableOpacity>
        <View style={styles.busrow}>
          <Text style={{flex:1}}>{strings[renderData.type]}</Text>
          <Text style={{flex:1}}>{renderData.line}</Text>
          <Text style={{flex:4, color:'black'}}>{renderData.destination}</Text>
          <Text style={{flex:1, color:'black'}}>{renderData.leaves} min</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <View style={styles.busrowheader}>
        <Text style={{flex:1}}>{strings.type}</Text>
        <Text style={{flex:1}}>{strings.line}</Text>
        <Text style={{flex:4}}>{strings.dest}</Text>
        <Text style={{flex:1}}>{strings.leaves}</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>{strings.title} 3029</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

export default BusListView;
