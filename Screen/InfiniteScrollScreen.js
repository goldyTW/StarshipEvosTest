import React, { useState } from 'react';
import { Provider, History, Trigger } from 'react-history-search';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-shadow-cards';
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";
import Icon from 'react-native-vector-icons/FontAwesome';

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default class InfiniteScrollScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            animating: true,
            user_id: null,
            search: '',
            loadingModal: false,
        };
        this.arrayholder = [];
       
    }

    async onClickHandler(url) {
        try {
            await InAppBrowser.open(url);
            InAppBrowser.configure({
                android: {
                    toolbarColor: "#20A4FF",
                    preferredBarTintColor: 'white',
                    showTitle: true
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        return fetch('https://swapi.dev/api/starships').
        then(response => response.json())
            .then(responseJson => {
                if (responseJson.results!=null) {
                    this.setState({
                        dataSource: responseJson.results,
                    },
                    function () {
                        this.arrayholder = responseJson.results;
                    }
                    );
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    search = text => {
        console.log(text);
    };

    clear = () => {
        this.search.clear();
    };

    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            search: text,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../Image/evoslogo.png')} 
                    style={styles.topIllus} />
                <TextInput
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    placeholder="Search Starship..."
                    style={styles.search}
                    pinnedSuggestions = {[ `react-native-search-header`, `react-native`, `javascript` ]}
                    onGetAutocompletions = {async (text) => {
                        if (text) {
                            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                method: `get`
                            });
                            const data = await response.json();
                            return data[1];
                        } else {
                            return [];
                        }
                    }}
                    >
                    {/* <History isHint isTabFill>
                        <input id="some_unique_id"/>
                    </History> */}
                </TextInput>
                {/* <Provider value={{ 
                    handleSearch,
                }}></Provider> */}
                <FlatList data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <Card style={{ 
                            margin: deviceHeight * 0.5 / 100,
                            borderRadius:20,
                            backgroundColor : "whitesmoke" }}>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={() => { this.onClickHandler(item.url) }} 
                                >
                                <View style={styles.baris1Card }>
                                    <Text style={styles.textID}>{item.name} </Text>
                                </View>
                                <View style={styles.baris2Card}>
                                    <Text style={styles.textDetail}>{item.model} </Text>
                                </View>
                                <View style={styles.baris2Card}>
                                    <Icon name="bars" size={22} style={styles.icon} /> 
                                    <Text style={styles.textDetail}> {item.length} </Text>
                                    <Icon name="user" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}> {item.passengers} </Text>
                                    <Icon name="clock-o" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.max_atmosphering_speed} </Text>
                                    <Icon name="star" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.hyperdrive_rating} </Text>
                                    <Icon name="hourglass" size={16} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.consumables} </Text>
                                </View>
                                <View style={styles.baris2Card}>
                                    <Icon name="building" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.manufacturer} </Text>
                                </View>
                                <View style={styles.baris2Card}>
                                    <Icon name="users" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.crew} </Text>
                                    <Icon name="circle" size={20} style={styles.icon} />
                                    <Text style={styles.textDetail}>{item.cargo_capacity} </Text>
                                    <Text style={styles.textDetail}>
                                        MGLT: {item.MGLT} </Text>
                                </View>
                                <View style={styles.baris2Card}>
                                    <Icon name="dollar" size={25} style={styles.iconprice} />
                                    <Text style={styles.textDetail2}>{item.cost_in_credits} </Text>
                                </View>
                                <View style={{
                                    borderBottomColor: '#17a7e0',
                                    borderBottomWidth: 5,
                                    width: 80,
                                    marginLeft: 20,
                                    marginVertical: deviceHeight * 2 / 100, 
                                }} />
                            </TouchableOpacity>
                        </Card>
                    )}
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11263b',
        alignItems: 'center',
    },
    search: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderWidth: 4,
        borderColor : "#17a7e0",
        width: '90%',
        borderRadius: 20,
        height: deviceHeight * 8 / 100,
        paddingLeft: deviceWidth * 4 / 100,
    },
    baris1Card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: deviceWidth * 5 / 100,
        paddingTop: deviceHeight * 2 / 100, 
    },
    baris2Card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: deviceWidth * 5 / 100,
        paddingVertical: deviceHeight * 0.5 / 100, 
    },
    baris3Card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: deviceWidth * 5 / 100,
        paddingTop: deviceHeight * 0.5 / 100, 
        paddingBottom: deviceHeight * 2 / 100, 
    },
    textID: {
        fontSize: 20,
        color: '#0a0a0a',
    },
    textDetail: {
        fontSize: 14,
        marginRight: 10,
        color: '#0a0a0a',
    },
    textDetail2: {
        fontSize: 20,
        color: '#faa405',
        marginRight: 10,
    },
    icon: {
        marginRight: deviceWidth * 0.6 / 100,
        color: '#17a7e0',
    },
    iconprice: {
        marginRight: deviceWidth * 0.6 / 100,
        color: '#faa405',
    },
    topIllus: {
        marginVertical:deviceHeight * 2 / 100,
        width: deviceWidth * 70 / 100,
        height: deviceHeight * 15 / 100,
    },
    activityIndicator2: {
        alignItems: 'center',
        height: deviceHeight * 5 / 100,
    },
})