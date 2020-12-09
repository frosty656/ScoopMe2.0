import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
//import {uploadImage} from '../../components/Firebase/firebase';
import * as ImageManipulator from "expo-image-manipulator";

import AppButton from '../../components/AppButton'
import Colors from "../../utils/colors";

import'firebase/storage'
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';


class ImagePickerExample extends React.Component {
  state = {
    image: "",
  };

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors.primary}}>
        <Image style={{ width: 200, height: 200}} source={this.state.image ? { uri: this.state.image} : null}/>
        {this.showUpdateButton()}
      </View>
    );
  }

  showUpdateButton(){
    if(this.state.image != ""){
      return (<AppButton title="Upload to FireBase" onPress={this.uploadToFirebase}/>)
    } else {
      return(<AppButton title="Pick an image" onPress={this._pickImage}/>)
    }
  }

  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    var ref = firebase.storage().ref().child("profileImages/" + auth.currentUser.uid)
  
    return ref.put(blob)
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

    uploadToFirebase = async () => {
      try{
          await this.uploadImage(this.state.image)
      } catch (error) {
          console.log(error);
      }
    }
    

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

    resizeImage = async () => {
      const height = Image.resolveAssetSource(this.state.image);
      const width = Image.resolveAssetSource(this.state.image);
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.image,
            [{ crop: {
              originX: 0,
              originY: (height - width) / 2,
              width: width,
              height: width
           } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
    }
}

export default ImagePickerExample;