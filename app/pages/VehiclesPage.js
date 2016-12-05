import React, { Component } from 'react'
import { ActivityIndicator, ListView, View} from 'react-native'
import { connect } from 'react-redux'

import { DefaultText } from '../components/textComponents'
import { BoldTitleBar } from '../components/TitleBar'
import AccessibilityView from '../components/AccessibilityView'

import styles from '../styles/stylesheet'
import strings from '../resources/translations'

const UPDATE_INTERVAL_IN_SECS = 10

class VehiclesPage extends Component {

    constructor(props)
    {
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })

        this.state = {
            dataBlob: {},
            dataSource: ds.cloneWithRowsAndSections({}, []),
            vehicles: [],
            stopCount: 0,
            locatingUser: true
        }
        this.sceneName = 'vehicles'
    }

    render()
    {
        let viewElement

      if (true)
      {
          viewElement =  <DefaultText>stop beacon:{'\n'}
            {this.props.beaconData.uuid}{'\n'}
            {this.props.beaconData.major}{'\n'}
            {this.props.beaconData.minor}{'\n'}
            </DefaultText>
        // this.renderList()
      }
        else if (false)
      {
            viewElement = this.renderFetchError()
        }
        else
      {
            viewElement = this.renderSpinner(strings.loadingDepartures)
        }

        return (
          <AccessibilityView style={styles.flex1} name={this.sceneName}>
            <BoldTitleBar title={strings.nearestVehicles} noBorder={true}/>
            {viewElement}
          </AccessibilityView>
        )
    }

    renderSeparator = (sectionID, rowID) =>
    {
        return (<View key={sectionID + '-' + rowID} style={styles.rowSeparator}></View>)
    }

    renderFetchError = () =>
    {
        return (
            <View style={styles.spinnerContainer}>
              <View style={styles.spinnerBackground}>
                <DefaultText style={styles.fetchDeparturesError}>
                  {strings.fetchDeparturesError}
                </DefaultText>
              </View>
            </View>
        )
    }
    renderSpinner = (text) =>
    {
        return (
            <View style={styles.spinnerContainer}>
                <View style={styles.spinnerBackground}>
                    <DefaultText style={styles.loadingDeparturesText}>
                        {text}
                    </DefaultText>
                    <ActivityIndicator
                        size="large"
                        animating={true}
                    />
                </View>
            </View>
        )
    }
  }

const mapStateToProps = (state) =>
  {
    return {beaconData: state.beacons.vehicleBeaconData}
}

  const mapDispatchToProps = (dispatch) =>
  {
      return {}
  }

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage)
