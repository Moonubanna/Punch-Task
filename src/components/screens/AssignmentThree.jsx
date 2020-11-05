import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, DeviceEventEmitter, TouchableHighlight,
    Alert,
    ImageBackground,
    Linking,
} from 'react-native'
import { colors } from '../../theme';
import { DIMENS, API, KEY, LOCALES, FONT_FAMILIY, SCREEN } from '../../constants';
import { storeData, retrieveData, clearData } from '../../common/AsyncStorage'

//Library
import Orientation from 'react-native-orientation';

//Hoc
import * as HOC from '../../common/hoc';
const SpinnerHOCView = HOC.SpinnerHOC(View);

export default class AssignmentThree extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        console.log('componentDidMount of AssignmentThree screen')
        Orientation.lockToPortrait();
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            this.setState({
                isLoading: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 2000);
            })
        });
    }
    componentWillUnmount() {
        console.log('componentWillUnmount of AssignmentThree screen')
        // Remove the event listener
        this.focusListener.remove();
    }
    render() {
        const { data, loading } = this.props
        return (
            <SpinnerHOCView
                isLoading={this.state.isLoading}
                style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: colors.color_white
                }}>
                <View style={{
                    flex: 1,
                }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: colors.black,
                            fontSize: DIMENS.txt_size_large_extra,
                            paddingHorizontal: DIMENS.px_10,
                            paddingVertical: DIMENS.px_10
                        }}>{'Assignment3 for HOC'}</Text>
                    </View>
                </View>
            </SpinnerHOCView>
        )
    }
}