import React from 'react'
import {
    Text, Image,FlatList,
    View, TextInput,
    TouchableWithoutFeedback
} from 'react-native'
import { colors } from '../../theme';
import { DIMENS, API, KEY, LOCALES, FONT_FAMILIY, SCREEN, WIDTH, HEIGHT } from '../../constants';
import { storeData, retrieveData, clearData } from '../../common/AsyncStorage'
import Loader from '../../common/Loader'
import { IconX, ICON_TYPE } from '../../utility/Icons';

//Library
import Orientation from 'react-native-orientation';
import Ripple from 'react-native-material-ripple';

export default class AssignmentTwo extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            searchTxtField: '',
            ituneArray: [],
            holdItuneSearchArray: [],
            isHoldSearchModal: false,
        }
    }
    componentDidMount() {
        console.log('componentDidMount of AssignmentTwo screen')
        Orientation.lockToPortrait();
    }
    componentWillUnmount() {
        console.log('componentWillUnmount of AssignmentTwo screen')
    }

    // Call get all Itune song list api
    callGetItuneSongApi = (search) => {

        let requestData = {
            search: search
        }
        this.props.requestGetItuneSongApi(requestData).then(result => {
            this.responseGetItuneSongApi(result)
        })
    }
    responseGetItuneSongApi = async (response) => {

        if (response != undefined) {
            this.setState({
                ituneArray: response.results,
                holdItuneArray: response.results,
                isHoldSearchModal:false
            })
            if (this.state.searchTxtField != '') {
                //For showing previous search result i am using array to store last search ( We can also use Async Storage)
                //add search text into hold array
                let searchArray = [];
                let isExist = false
                //check search text already exist or not in hold array
                await this.state.holdItuneSearchArray.forEach(element => {
                    if (element == this.state.searchTxtField) {
                        isExist = true
                    } else {
                        isExist = false
                    }
                });
                if (isExist == false) {
                    searchArray.push(this.state.searchTxtField)
                }

                this.setState({
                    holdItuneSearchArray: [...searchArray, ...this.state.holdItuneSearchArray],
                    searchTxtField: '',
                })
            }
            //Hide focus
            this.searchRef.blur()
        }
    }

    SearchFilterFunction(search) {
        if (search != '' && search.length >= 3) {
            this.callGetItuneSongApi(search)
        } else {
            alert('Please enter 3 character for search')
        }
    }
    render() {
        const { data, loading } = this.props
        return (
            <View style={{
                backgroundColor: colors.color_white,
                flex: 1,
                width: '100%',
            }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.color_primary,
                    }}>
                    <TextInput
                        onFocus={() => {
                            console.warn('ENTER1')
                            if (this.state.holdItuneSearchArray.length != 0)
                                this.setState({
                                    isHoldSearchModal: true
                                })
                        }}
                        autoFocus={false}
                        placeholder={'Search...'}
                        placeholderTextColor={colors.color_white}
                        keyboardType={'default'}
                        ref={(refs) => this.searchRef = refs}
                        onChangeText={(txt) => {
                            this.setState({ searchTxtField: txt })
                        }}
                        returnKeyType="done"
                        value={this.state.searchTxtField}
                        autoCorrect={false}
                        style={{
                            width: '90%',
                            paddingLeft: 10,
                            minHeight: DIMENS.px_45,
                            color: colors.color_white,
                        }}
                    />
                    <Ripple
                        onPress={() => {
                            this.SearchFilterFunction(this.state.searchTxtField)
                        }}>
                        <IconX
                            origin={ICON_TYPE.MATERIAL_ICONS}
                            name='search'
                            color={colors.color_white}
                            size={24}
                        />
                    </Ripple>
                </View>
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.ituneArray}
                        renderItem={({ item, index }) => this.renderItuneItem(item, index)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ backgroundColor: colors.color_white }}
                        ItemSeparatorComponent={this.flatListItemSeparator}
                    />
                </View>
                {loading ?
                    <Loader /> : null}
                {this.state.isHoldSearchModal &&
                    this.holdSearchModal()}
            </View>
        )
    }

    holdSearchModal = () => {
        return (
            <TouchableWithoutFeedback
                onPress={(evt) => {
                    this.setState({
                        isHoldSearchModal: false
                    }, () => {
                        //Hide focus
                        this.searchRef.blur()
                    })
                }}>
                <View style={{
                    width: '100%',
                    marginTop: DIMENS.px_45,
                    backgroundColor: 'white',
                    position: 'absolute',
                    height: HEIGHT - 50,
                    backgroundColor: colors.transparent
                }}>
                    {
                        this.state.holdItuneSearchArray.map((element) => {
                            return (
                                <Ripple
                                    style={{
                                        width: '100%',
                                        padding: DIMENS.px_10,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        backgroundColor: colors.grey200
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isHoldSearchModal: false,
                                        }, () => {
                                            this.callGetItuneSongApi(element)
                                        })
                                    }}>
                                    <Text style={{
                                        color: colors.black,
                                        fontSize: DIMENS.txt_size_medium_14,
                                        fontWeight: '800'
                                    }}>{element}</Text>
                                </Ripple>
                            )
                        })
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderItuneItem = (item, index) => {
        console.log('item  ', item)
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: DIMENS.px_10,
                }}>
                <View
                    style={{
                        width: '20%',
                    }}>
                    <Image
                        style={{
                            height: DIMENS.px_100
                        }}
                        resizeMode={'contain'}
                        source={{ uri: item.artworkUrl100 }}
                    />
                </View>
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: DIMENS.px_5
                    }}>
                    <Text style={{
                        color: colors.color_primary,
                        fontSize: DIMENS.txt_size_medium_14,
                    }}
                        numberOfLines={2}>{'Artist: ' + item.artistName}</Text>

                    <Text style={{
                        color: colors.grey900,
                        fontSize: DIMENS.txt_size_medium,
                        marginTop: DIMENS.px_10
                    }}
                        numberOfLines={1}>{'Coll name: ' + item.collectionName}</Text>

                    <Text style={{
                        color: colors.grey700,
                        fontSize: DIMENS.txt_size_small_12,
                        marginTop: DIMENS.px_10
                    }}>{'Tack price: ' + item.trackPrice + item.currency}</Text>
                </View>
            </View>
        )
    }

    flatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: colors.grey500,
                }}
            />
        );
    }
}
