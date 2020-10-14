import React from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, TextInput } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { isThisHour } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import {newRide} from '../../components/Firebase/firebase'

class MapViewExample extends React.Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    range: 1000,
    marker: null,  // id, log, lat, title
    currentLocation: null,
    rideInfo: {
      leaveTime: new Date(1598051730000)
    },
    informationState: 1
  };


  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  async getLocationAsync () {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      this.setState({
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        currentLocation: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      });
    } else {
      alert('Location permission not granted');
    }
  };

  handlePinLocation = () => {
    if(this.state.marker){
      return(
        <Marker title={this.state.marker.title} coordinate={{longitude: this.state.marker.lng, latitude: this.state.marker.lat}}/>
      )
    } else {
      return null
    }
  }

  handleCircle = () => {
    if(this.state.currentLocation){
      return(
        <Circle 
          center={{latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng}} 
          radius={this.state.range} fillColor={'rgba(52, 216, 235, 0.4)'} 
          strokeColor={'rgba(52, 216, 235, 0.6)'}
        />
      )
    } else {
      return null
    }
  }

  //This should go away
  handleRideButton = () => {
    if(this.state.marker){
      return (
        <View zIndex={6} style={styles.rideButton}>
          <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
            <Button style={styles.buttonStyle} title="Add Ride" onPress={() => this.handleRideInformation} />
          </View>
        </View>
      )
    } else {
      return null
    }
  }

  //Fill in the data object that we have for ride information
  handleRideInformation = () => {
      //Get time
      if(this.state.informationState == 2){
        return (
          <View zIndex={6} style={styles.timePicker}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.rideInfo.leaveTime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={ (event, selectedDate) => {this.setState({rideInfo: {leaveTime: selectedDate}})}}
            />
             <Button style={styles.buttonStyle} title="Set Time" onPress={() => this.setState({informationState: 3})} />
            </View>
          </View>

        )
      }
      //Description
      if(this.state.informationState == 3) {
        return (
          <View zIndex={6} style={styles.rideButton}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
              <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => this.setState({rideInfo: {desc: text}})}/>
             <Button style={styles.buttonStyle} title="Add Notes" onPress={() => this.setState({informationState: 4})} />
            </View>
          </View>
        )
      }
      if(this.state.informationState == 4) {
        return (
          <View zIndex={6} style={styles.rideButton}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
             <Button style={styles.buttonStyle} title="Set Ride" onPress={
               () => newRide(
                 //title, destLng, destLat, startLng, startLat,leaveTime, desc
                 this.state.marker.title,
                 this.state.marker.lng,
                 this.state.marker.lat,
                 this.state.currentLocation.lng,
                 this.state.currentLocation.lat,
                 new Date(1598051730000),
                 //this.state.rideInfo.leaveTime,
                 this.state.rideInfo.desc

               )
               } />
            </View>
          </View>
        )
      }

      return null
    
    //assign title, start and end lat / lng

    //prompt for time
    //Prompt for description
  }


  render() {
    return (
        <View style={styles.container}>
          <View zIndex={1}>
            <MapView
            style={styles.mapStyle}
            region={this.state.mapRegion}
            onRegionChange={this.handleMapRegionChange}>
              
              <this.handleCircle/>
              <this.handlePinLocation/>
              
            </MapView>
          </View>

          <View zIndex={2} style={styles.floatingButton}>
            
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2}
              autoFocus={false}
              //TODO: Limit this from getting all details and only get details relevant to what we need
              fetchDetails={true}
              onPress={(data, details = null) => {
                this.setState({marker: {
                  lat: details.geometry.location.lat, 
                  lng: details.geometry.location.lng, 
                  title: data.structured_formatting.main_text
                }})
                this.setState({informationState: 2})
                console.log(data);
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                key: 'AIzaSyAdweI54n6dgNJwQeGqGER9WYIESRkqEqE',
                language: 'en',
                rankby: 'distance',
              }}
              enablePoweredByContainer={false}
            />
          </View>
            <this.handleRideInformation/>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  buttonStyle: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  floatingButton: {
    position: 'absolute', 
    padding: 20,
    transform: [
      {translateY: 30}
    ],
    width: Dimensions.get('window').width,
    
  },
  rideButton: {
    position: 'absolute', 
    padding: 20,
    transform: [
      {translateY: Dimensions.get('window').height - 150}
    ],
    width: Dimensions.get('window').width,
    borderColor: 'black'
  },
  timePicker: {
    position: 'absolute', 
    padding: 20,
    transform: [
      {translateY: Dimensions.get('window').height - 350}
    ],
    width: Dimensions.get('window').width,
    borderColor: 'black'
  }
});

export default MapViewExample;