import * as React from 'react';
import { Text, View, Button, TextInput, SafeAreaView, FlatList } from 'react-native';

import 'firebase/firestore';
import { firestore } from 'firebase';

import IconButton from '../../components/IconButton'



class RideScreen extends React.Component {
    state = {
        trips: []
    }
    constructor(props){
        super(props);
        this.subscriber = firestore().collection('Trips')
        .onSnapshot(docs =>{
            let trips = []
            docs.forEach(doc =>{
                trips.push(doc.data())
            })
            this.setState({ trips })
        })
    }

    renderRow({ item }) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5}}>
                <Text style={{fontSize: 20}}>{item.Deliverer}</Text>
                <IconButton
                    iconName="arrow-right"
                    size={30}
                    onPress={() => console.log("Going to " + item.Deliverer)}
                />
            </View>
        )
    }

    render() {
        return(
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 50, flex: 1}}>Trips:</Text>
                <View style={{flexDirection: 'row', flex: 9}}>
                    <FlatList 
                        contentContainerStyle={{flexGrow: 1}}
                        data={this.state.trips}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <this.renderRow item={item}/>}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default RideScreen;