import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View, Image, Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../theme'
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, KEY, SCREEN } from '../constants';
import { retrieveData } from './AsyncStorage'
import NavigationService from '../NavigationService';


export class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    setTimeout(() => {

      NavigationService.clearStack(SCREEN.NAVIGATION_TAB);
    }, 2000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
          backgroundColor: colors.color_primary
        }}>
        <Text style={{
          color: colors.color_white,
          fontSize: DIMENS.txt_size_medium_14,
          marginTop: DIMENS.px_10
        }}
          numberOfLines={1}>
          {'**Welcome**'}
        </Text>
        <ActivityIndicator
          color={colors.color_white} size="large"
          style={{
            marginTop: DIMENS.px_30
          }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  },
});