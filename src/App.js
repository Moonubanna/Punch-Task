import React from 'react'
import { connect } from 'react-redux'
import { AppState, StatusBar, StyleSheet, View, Platform, SafeAreaView, Text, } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

import Navigator from './Navigation'
import NavigationService from './NavigationService'
import Loading from './components/Loading'
import { connectionStateChanged } from './actionCreators'
import { appStartThunk, trackAppState, connectionStateHandler } from './thunks'
import { colors } from './theme'
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.colorPrimarydark,
    flex: 1,
    justifyContent: 'center',
  },
  navigatorView: {
    flex: 1,
    width: '100%',
  },
})
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class App extends React.Component {

  NO_INTERNET = 'Seems like there is no internet connection'
  netInfoUnsubscribe
  constructor(props) {
    super(props)
    props.appStartThunk()
  }

  componentDidMount() {
    const {
      appStateHandler,
      connectionState,
      netInfoHandler,
    } = this.props
    NetInfo.fetch().then(netInfoState => {
      connectionState(netInfoState.isConnected)
    })
    AppState.addEventListener('change', appStateHandler)
    this.netInfoUnsubscribe = NetInfo.addEventListener(netInfoHandler)
    
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.props.appStateHandler)
    this.netInfoUnsubscribe && this.netInfoUnsubscribe()
  }

  onRemoteNotificationIOS(notification) {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  }

  render() {
    const { online } = this.props
    return (
      <SafeAreaView style={{ backgroundColor: colors.color_primary_dark, flex: 1, width: '100%' }}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.color_primary_dark}
            barStyle='light-content'
          />
          <View style={styles.navigatorView}>
            <Navigator ref={NavigationService.init} />
            {!online &&
              <Loading message={this.NO_INTERNET} online={!online} />}
          </View>
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = ({ app }) => ({
  online: app.online
})

const mapDispatchToProps = {
  appStartThunk,
  connectionState: connectionStateChanged,
  netInfoHandler: connectionStateHandler,
  appStateHandler: trackAppState,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
