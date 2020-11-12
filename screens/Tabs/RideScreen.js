import * as React from 'react';
import {Text, View, Button, TextInput, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';

import 'firebase/firestore';
import { firestore } from 'firebase';

import IconButton from '../../components/IconButton'
import { useState } from 'react';
import { render } from 'react-dom';
import { Component } from 'react';
import Colors from "../../utils/colors";
import { isThisHour } from 'date-fns';

class RideScreen extends Component{

    state = {
        trips: [],
        pickups: [],
        currentView: 'trips'
    }

    constructor(props){
        super(props)
        this.handleGetData();
    }
    // This should be moved to the fireabse.js file to keep everything together
    // This should also have a filter for rides only in the future and in your area
    // Compound can be hard so maybe area and then sort by newest time and get top 50 then filter manually
    handleGetData() {
        this.subscriber = firestore().collection('Trips')
        .onSnapshot(docs =>{
            let tempTrips = []
            let tempPickups = []
            docs.forEach(doc =>{
                if(doc.data().type == 'ride'){
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempTrips.push(tempObj)
                } else {
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempPickups.push(tempObj)
                }

            })
            this.setState({trips: tempTrips, pickups: tempPickups})

        })
    }

    renderRideRow(item) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Destination: {item.title}</Text>
                    <Text style={{fontSize: 15, color: Colors.mediumGrey}}>Driver: {item.deliverer}</Text>
                </View>
                <IconButton
                    iconName="arrow-right"
                    size={30}
                    onPress={() => this.props.navigation.navigate('RideDetailScreen', {item})}
                />
            </View>
        )
    }

    renderPickupRow(item) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Destination: {item.title}</Text>
                    <Text style={{fontSize: 15, color: Colors.mediumGrey}}>Driver: {item.deliverer}</Text>
                </View>
                <IconButton
                    iconName="arrow-right"
                    size={30}
                    onPress={() => this.props.navigation.navigate('PickupDetailScreen', {item})}
                />
            </View>
        )
    }

    handleTripView = () => {
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/flame.png')} style={styles.logo} />
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity style={styles.tripsButtonUnfocused}>
                        <Text style={styles.textUnselected}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deliveryButtonFocused} onPress={() => this.setState({currentView: 'pickups'})}>
                        <Text style={styles.textSelected}>Delivery</Text>
                    </TouchableOpacity>
                </View>

            <View style={{flexDirection: 'row', flex: 9}}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={this.state.trips}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this.renderRideRow(item)}
                />
            </View>
                <View>
                    <IconButton
                        iconName="email"
                        size={45}
                        style={styles.messageIconButton}
                        color={Colors.blue}
                        onPress={() => this.props.navigation.navigate('Messages')}>
                    </IconButton>
                </View>
        </SafeAreaView>
        )
    }

    handlePickupView = () => {
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/flame.png')} style={styles.logo} />
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity style={styles.tripsButtonFocused} onPress={() => this.setState({currentView: 'trips'})}>
                        <Text style={styles.textSelected}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deliveryButtonUnfocused} >
                        <Text style={styles.textUnselected}>Delivery</Text>
                    </TouchableOpacity>
                </View>

            <View style={{flexDirection: 'row', flex: 9}}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={this.state.pickups}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this.renderPickupRow(item)}
                />
            </View>
                <View>
                    <IconButton
                        iconName="email"
                        size={45}
                        style={styles.messageIconButton}
                        color={Colors.blue}
                        onPress={() => this.props.navigation.navigate('Messages')}>
                    </IconButton>
                </View>
        </SafeAreaView>
        )
    }

    render(){
           // console.disableYellowBox = true; // remove all warnings
        if(this.state.currentView == 'trips'){
            return (
                <this.handleTripView/>
            )
        } else {
            return (
                <this.handlePickupView/>
            )
        }
    }
}

export default RideScreen;

const styles = StyleSheet.create({
    deliveryButtonFocused: {
        width: '50%', 
        alignItems: 'center', 
        backgroundColor: Colors.lightGrey2, 
        borderRadius: 5,
        padding: 5,
    },
    deliveryButtonUnfocused: {
        width: '50%', 
        alignItems: 'center', 
        backgroundColor: Colors.blue, 
        borderRadius: 5,
        padding: 5,
    },
    logo: {
        width: 45,
        height: 45,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    messageIconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 300,
        paddingBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row', 
        paddingBottom: 10,
    },
    textSelected: {
        fontSize: 23, 
    },
    textUnselected: {
        fontSize: 23, 
        color: Colors.ghostWhite,
    },
    tripsButtonFocused:{
        width: '50%', 
        alignItems: 'center', 
        backgroundColor: Colors.lightGrey2,
        borderRadius: 5,
        padding: 5,
    },
    tripsButtonUnfocused: {
        width: '50%', 
        alignItems: 'center', 
        backgroundColor: Colors.blue,  
        borderRadius: 5, 
        padding: 5,
    },

});
