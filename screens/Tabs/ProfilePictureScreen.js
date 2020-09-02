import * as React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { auth } from '../../components/Firebase/firebase';

class ProfilePicture extends React.Component {
    state={
        profileImageUrl: "",
        imagePath: "/profileImages/" + auth.currentUser.uid


    }
    constructor(props){
        super(props)
        this.getImageURL();
        
    }

    render(){
        if(this.state.imagePath != ""){
            return(
                <View>
                    <Image source={{ uri: this.state.profileImageUrl }} style={{ width: 150, height: 150, borderRadius: 400/ 2 }} />
                </View>
            )
        } else {
            return(
                <View> <ActivityIndicator /></View>
            )
        }
    }

    async getImageURL () {
        try{
            let imageRef = firebase.storage().ref(this.state.imagePath);
            const url = await imageRef.getDownloadURL();
            this.setState({profileImageUrl: url})
        } catch (error) {
            console.log(error);
        }
    }
}


export default ProfilePicture;
//<Image source={{ uri: this.state.profileImageUrl }} style={{ width: 150, height: 150, borderRadius: 400/ 2 }} />