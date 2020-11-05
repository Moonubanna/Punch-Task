import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator,headerShown } from 'react-navigation-stack'

import { navigationHeader } from './theme'

 import { AuthLoadingScreen } from './common/AuthLoadingScreen';
 //tab
 import NavigationTab from './NavigationTab';


const AppNavigator1 = createStackNavigator({
  NavigationTab:{screen: NavigationTab,navigationOptions:{headerShown:false}},
}, 
{
  initialRouteName: 'NavigationTab',
  defaultNavigationOptions: navigationHeader,
  headerMode:'none',

});
const AppNavigator = (createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AppStack: AppNavigator1,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default createAppContainer(AppNavigator)
