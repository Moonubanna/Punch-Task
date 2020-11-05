import React from 'react';
import { View, Image, Text } from 'react-native';
//libraries
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { IconX, ICON_TYPE } from './utility/Icons';

import { colors } from './theme';
import { DIMENS, API, KEY, LOCALES, FONT_FAMILIY, SCREEN } from './constants'

//screens
import AssignmentOne from './containers/screens/AssignmentOne'
import AssignmentTwo from './containers/screens/AssignmentTwo'
import AssignmentThree from './containers/screens/AssignmentThree'

const TabNavigator = createMaterialBottomTabNavigator(
    {
        AssignmentOne: {
            screen: AssignmentOne,
            navigationOptions: {
                tabBarLabel: <Text style={{
                    fontSize: DIMENS.txt_size_medium_14,
                }}>
                    {'Asign1'}</Text>,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconX
                            origin={ICON_TYPE.MATERIAL_ICONS}
                            name='watch-later'
                            color={tintColor}
                            size={22}
                        />
                    </View>),
                showLabel: true,
                activeColor: colors.color_accent,
                inactiveColor: colors.color_white,
                barStyle: { backgroundColor: colors.color_primary_dark },
            }
        },
        AssignmentTwo: {
            screen: AssignmentTwo,
            navigationOptions: {
                tabBarLabel: <Text style={{
                    fontSize: DIMENS.txt_size_medium_14,
                }}>
                    {'Asign2'}</Text>,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconX
                            origin={ICON_TYPE.FONT_AWESOME5}
                            name='music'
                            color={tintColor}
                            size={22}
                        />
                    </View>),
                showLabel: true,
                activeColor: colors.color_accent,
                inactiveColor: colors.color_white,
                barStyle: { backgroundColor: colors.color_primary_dark },
            }
        },
        AssignmentThree: {
            screen: AssignmentThree,
            navigationOptions: {
                tabBarLabel: <Text style={{
                    fontSize: DIMENS.txt_size_medium_14,
                }}>
                    {'Asign3'}</Text>,
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <IconX
                            origin={ICON_TYPE.FONT_AWESOME}
                            name='creative-commons'
                            color={tintColor}
                            size={22}
                        />
                    </View>),
                showLabel: true,
                activeColor: colors.color_accent,
                inactiveColor: colors.color_white,
                barStyle: { backgroundColor: colors.color_primary_dark },
            }
        }
    },
    {
        tabBarOptions: {
            style: { backgroundColor: colors.color_primary_dark },
            activeTintColor: colors.color_accent,
            inactiveTintColor: colors.color_white,
        },
        initialRouteName: "AssignmentOne",
        activeColor: colors.color_accent,
        inactiveColor: colors.color_white,
        shifting: false,
        labeled: true,
        barStyle: { backgroundColor: colors.color_primary_dark, height: 53 },
    },
);



export default TabNavigator;
