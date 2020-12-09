import React from 'react';
import { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';

import ProfilePicture from './ProfilePictureScreen'
import SafeView from '../../components/SafeView';
import IconButton from "../../components/IconButton";
import useStatusBar from "../../hooks/useStatusBar";
import MessagesInboxScreen from "../MessagesInboxScreen";
import AppButton from "../../components/AppButton";
import Colors from "../../utils/colors";


//move this to the firebase file
import 'firebase/firestore';
import { firestore } from 'firebase';
import { auth} from '../../components/Firebase/firebase'
import * as firebase from 'firebase';
import moment from 'moment';

class SettingsScreen extends Component{
    

    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            pickups: [],
            currentView: 'trips'
        }

        

        this.handleGetUserHistory();
    }
    // Move this to the firebase file
    handleGetUserHistory(){
        firebase.firestore().collection("Users").doc(auth.currentUser.uid).collection('History')
        .onSnapshot(docs => {
            let tempTrips = []
            let tempPickups = []
            docs.forEach( doc => {
                // The info in these history files is a summary of the ride
                // For full info call the original file with the UID provided
                if(doc.data().type == 'ride'){
                    console.log("Adding item")
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
            console.log(this.state.trips)
        })
    }

    renderRideRow(item) {
        var t = moment(Date(item.time.seconds * 1000)).format('MMM, DD')
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 20, color: Colors.mediumGrey}}>{t}- {item.destination}</Text>
                </View>
            </View>
        )
    }


    renderPickupRow(item) {
        var t = moment(Date(item.time.seconds * 1000)).format('MMM, DD')
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20, color: Colors.mediumGrey}}>{t}- {item.destination}</Text>
                </View>
            </View>
        )
    }


    handleHistoryView = () => {

        if(this.state.currentView == 'trips'){
            return (
                <View style={{flex: 1, alignItems: 'center'}}>

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
            </View>
            )
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center'}}>


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
        </View>
            )
        }
    }



    render() {
        return (
        <SafeView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.primary}}>
            <View style={styles.container}>
                <ProfilePicture/>
                <Text style={styles.text}>{auth.currentUser.displayName}</Text>
            </View>
            <this.handleHistoryView/>

        </SafeView>

        );
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        padding: 10,
        fontSize: 20,
        color: Colors.mediumGrey
    },
    container: {
        alignItems: 'center',
        paddingTop: 30
    },
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
