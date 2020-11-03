import * as React from 'react';
import {Text, View, Button, TextInput, SafeAreaView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

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

    handleGetData() {
        this.subscriber = firestore().collection('Trips')
        .onSnapshot(docs =>{
            let tempTrips = []
            let tempPickups = []
            docs.forEach(doc =>{
                if(doc.data().type == 'ride'){
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempTrips.push(tempObj)
                    console.log(tempObj)
                } else {
                    let tempObj = Object.assign(doc.data(),{"id": doc.id})
                    tempPickups.push(tempObj)
                    console.log(tempObj)
                }
                
            })
            this.setState({trips: tempTrips, pickups: tempPickups})
        })
    }

    renderRideRow(item) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Destination: {item.title}</Text>
                    <Text style={{fontSize: 15}}>Driver: {item.deliverer}</Text>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Destination: {item.title}</Text>
                    <Text style={{fontSize: 15}}>Driver: {item.deliverer}</Text>
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

                <View style={{flexDirection: 'row', height: 100, padding: 20}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 5}}>
                        <Text style={{fontSize: 50, flex: 1}}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center'}} onPress={() => this.setState({currentView: 'pickups'})}>
                        <Text style={{fontSize: 50, flex: 1}}>Pickups</Text>
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

                <View style={{flexDirection: 'row', height: 100, padding: 20}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center'}} onPress={() => this.setState({currentView: 'trips'})}>
                        <Text style={{fontSize: 50, flex: 1}}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 5}} >
                        <Text style={{fontSize: 50, flex: 1}}>Pickups</Text>
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
    }
});
