import * as React from 'react';
import { Text, View, Button, TextInput, SafeAreaView, FlatList } from 'react-native';

import 'firebase/firestore';
import { firestore } from 'firebase';

import IconButton from '../../components/IconButton'
import { useState } from 'react';
import { render } from 'react-dom';
import { Component } from 'react';

class RideScreen extends Component{

    state = {
        trips: [],
    }

    constructor(props){
        super(props)
        this.handleGetData();
    }

    handleGetData() {
        this.subscriber = firestore().collection('Trips')
        .onSnapshot(docs =>{
            let tempTrips = []
            docs.forEach(doc =>{
                let tempObj = Object.assign(doc.data(),{"id": doc.id})
                tempTrips.push(tempObj)
                console.log(tempObj)
            })
            this.setState({trips: tempTrips})
        })
    }

    renderRow(item) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 20}}>Destination: {item.title}</Text>
                    <Text style={{fontSize: 15}}>Driver: {item.deliverer}</Text>
                </View>
                <IconButton
                    iconName="arrow-right"
                    size={30}
                    onPress={() => this.props.navigation.navigate('DetailScreen', {item})}
                />
            </View>
        )
    }

    render(){
           // console.disableYellowBox = true; // remove all warnings
        return(

            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 50, flex: 1}}>Trips:</Text>

            <View style={{flexDirection: 'row', flex: 9}}>
                <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={this.state.trips}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => this.renderRow(item)}
                />
            </View>
                <View>
                    <IconButton
                        iconName="email"
                        size={45}
                        style={{paddingLeft: 300, paddingBottom: 20}}
                        onPress={() => this.props.navigation.navigate('Messages')}>
                    </IconButton>
                </View>
        </SafeAreaView>
        )
    }
}

export default RideScreen;
