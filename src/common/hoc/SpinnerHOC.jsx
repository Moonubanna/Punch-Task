
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Loader from '../../common/Loader'

const SpinnerHOC = Comp => ({ isLoading, children, ...props }) => {

  return (
    <View
      style={{
        flex: 1,
        width:'100%'
      }}>
      <Comp {...props}>
        {children}
      </Comp>
      {
        isLoading &&
        <Loader />
      }
    </View>
  )
}
export default SpinnerHOC;