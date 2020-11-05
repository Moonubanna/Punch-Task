import React from 'react'
import { ActivityIndicator, Text, View,Image,Modal } from 'react-native'

import { colors } from '../theme'

const Loading = ({ message,online }) => (
  <View style={{
    alignItems: 'center',
    backgroundColor: colors.color_primary_dark,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }}>
    <Modal visible={online}>
    {/* {message ? ( */}
      <View style={{
        alignItems: 'center',justifyContent:'center',flex:1,width: '100%',
        flexDirection:'column'}}>
      <Text style={{ color: colors.color_white, textAlign: 'center' }}>
        {message}
      </Text>
      </View>
    {/* ) : null} */}
        <ActivityIndicator color={colors.color_white} size="large" />
    </Modal>

  

  </View>
)

Loading.navigationOptions = { title: 'Loading' }

export default Loading;