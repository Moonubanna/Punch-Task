import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView, Image,
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
import Svg, { Circle, G, LinearGradient, Path, Defs, Stop, Line, Text } from 'react-native-svg';
import range from 'lodash.range';

export default class AssignmentOne extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            radius: 150,
            strokeWidth: 20,
            showClockFace: true,
        }
    }
    componentDidMount() {
        console.log('componentDidMount of AssignmentOne screen')
        Orientation.lockToPortrait();
    }
    componentWillUnmount() {
        console.log('componentWillUnmount of AssignmentOne screen')
    }
    getContainerWidth() {
        const { strokeWidth, radius } = this.state;
        return strokeWidth + radius * 2 + 2;
    }

    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    getRadianForHour(h, m){
       return this.toRadians(((h*30) + (m*0.5)) - 90)
    }
    
    getRadianForMinute(m){
        return this.toRadians(m * 6 - 90)
    }
    render() {
        const { data, loading } = this.props
        const { radius, strokeWidth, showClockFace } = this.state;
        const containerWidth = this.getContainerWidth();
        const textRadius = (radius - strokeWidth / 2) - 20; //20 = external padding for text
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <View style={{
                    width: containerWidth, height: containerWidth,
                }}>
                    <Svg
                        height={containerWidth}
                        width={containerWidth}
                        ref={circle => this._circle = circle}
                    >
                        <G transform={{ translate: `${strokeWidth / 2 + radius}, ${strokeWidth / 2 + radius}` }}>
                            <Circle
                                r={radius}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                stroke={colors.color_primary}
                            />
                            {
                                showClockFace && (
                                    <G>
                                        {
                                            range(12).map((h, i) => (
                                                <Text
                                                    key={i}
                                                    fill={colors.color_black}
                                                    fontSize="16"
                                                    textAnchor="middle"
                                                    x={textRadius * Math.cos(this.toRadians(i * 30 - 60))}
                                                    y={textRadius * Math.sin(this.toRadians(i * 30 - 60)) + 16 / 2} //16/2 = Half of font size
                                                >
                                                    {h + 1}
                                                </Text>
                                            ))
                                        }
                                    </G>
                                )
                            }

                            {
                                <Line
                                    stroke={colors.color_primary}
                                    strokeWidth={5}
                                    x1={0}
                                    y1={0}
                                    x2={(textRadius - 40) * Math.cos(this.getRadianForHour(4,13))}
                                    y2={(textRadius - 40) * Math.sin(this.getRadianForHour(4,13))}
                                />
                            }

                            {
                                <Line
                                    stroke={colors.color_primary}
                                    strokeWidth={5}
                                    x1={0}
                                    y1={0}
                                    x2={(textRadius - 10) * Math.cos(this.getRadianForMinute(13))}
                                    y2={(textRadius - 10) * Math.sin(this.getRadianForMinute(13))}
                                />
                            }
                        </G>
                    </Svg>
                </View>
            </View>
        )
    }
}