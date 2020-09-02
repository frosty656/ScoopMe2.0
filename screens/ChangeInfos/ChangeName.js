import * as React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firestore } from 'firebase';
import {changeUsersName} from '../../components/Firebase/firebase'

class RideScreen extends React.Component {
    state = {
        newName: "",
    }

    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => {this.setState({newName: text})}}
                />
                <Button onPress={this.updateName} title="Update Name"/>
            </View>
        );
    }

    updateName =  () => {
        try{
             changeUsersName(this.state.newName)
        } catch (error) {
            console.log(error);
        }   
    }
}

export default RideScreen;