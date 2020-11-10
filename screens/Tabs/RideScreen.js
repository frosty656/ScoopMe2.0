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
import Color from "../../utils/colors";

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

    handleGetData() {
        this.subscriber = firestore().collection('Trips')
        .onSnapshot(docs =>{
            let tempTrips = []
            let tempPickups = []
            docs.forEach(doc =>{
                if(doc.data().type == 'ride'){
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempTrips.push(tempObj)
                    //console.log(tempObj)
                } else {
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempPickups.push(tempObj)
                    //console.log(tempObj)
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

                <View style={{flexDirection: 'row', height: 120, paddingTop: 50, paddingBottom: 10}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', backgroundColor: Colors.blue,  borderRadius: 5, paddingTop: 10}}>
                        <Text style={{fontSize: 25, flex: 1, color: Colors.ghostWhite}}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', backgroundColor: Colors.lightGrey2, paddingTop: 15}} onPress={() => this.setState({currentView: 'pickups'})}>
                        <Text style={{fontSize: 23, flex: 1}}>Delivery</Text>
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

                <View style={{flexDirection: 'row', height: 120, paddingTop: 50, paddingBottom: 10}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', paddingTop: 15, backgroundColor: Colors.lightGrey2}} onPress={() => this.setState({currentView: 'trips'})}>
                        <Text style={{fontSize: 23, flex: 1}}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', paddingTop: 10, backgroundColor: Color.blue, borderRadius: 5}} >
                        <Text style={{fontSize: 25, flex: 1, color: Colors.ghostWhite}}>Delivery</Text>
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
    messageIconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 300,
        paddingBottom: 20,
    },
    logoContainer: {
        position: 'absolute',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,

    },
    logo: {
        width: 45,
        height: 45,
        alignItems: 'center',
    }
});
