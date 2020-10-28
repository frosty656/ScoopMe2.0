import React from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, TextInput, Text, Animated, ScrollView  } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { isThisHour } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapViewDirections from 'react-native-maps-directions';


import {newRide} from '../../components/Firebase/firebase'

const { width, height} = Dimensions.get("window");
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.3;

class MapViewExample extends React.Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    range: 1000,
    marker: null,  // id, log, lat, title
    currentLocation: null,

    leaveTime: new Date(1598051730000),
    seats: 4,
    desc: "",

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
/*
  //Fill in the data object that we have for ride information
  handleRideInformation = () => {
      //Get time
      if(this.state.informationState == 2){
        return (
          <View style={styles.timePicker}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.leaveTime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={ (event, selectedDate) => {this.setState({leaveTime: selectedDate})}}
            />
             <Button style={styles.buttonStyle} title="Set Time" onPress={() => this.setState({informationState: 3})} />
            </View>
          </View>

        )
      }
      //Description
      if(this.state.informationState == 3) {
        return (
          <View style={styles.rideButton}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
              <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => this.setState({desc: text})}/>
             <Button style={styles.buttonStyle} title="Add Notes" onPress={() => this.setState({informationState: 4})} />
            </View>
          </View>
        )
      }
      //Seats
      if(this.state.informationState == 4) {
        return (
          <View style={styles.rideButton}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={5}>
             <Text>{this.state.seats}</Text>
             <Button style={styles.buttonStyle} title="Set Available Seats" onPress={() => this.setState({informationState: 5})} />
            </View>
          </View>
        )
      }
      if(this.state.informationState == 5) {
        return (
          <View style={styles.rideButton}>
            <View backgroundColor={'white'} borderColor={'black'} borderWidth={3} borderRadius={1}>
             <Button style={styles.buttonStyle} title="Set Ride" onPress={
               () => newRide(
                 //title, destLng, destLat, startLng, startLat,leaveTime, desc, seats
                 this.state.marker.title,
                 this.state.marker.lng,
                 this.state.marker.lat,
                 this.state.currentLocation.lng,
                 this.state.currentLocation.lat,
                 new Date(1598051730000),
                 //this.state.leaveTime,
                 this.state.desc, 
                 "John Smith",
                 this.state.seats

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
*/
  handleRideInformation = () => {
    return(
      <ScrollView 
      horizontal
      pagingEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
      style = {styles.scrollView}
    >
      <View style={styles.card}>
        <Text>Date Time Picker</Text>
        <Text>This will have a time picker</Text>
      </View>
      <View style={styles.card}>
        <Text>Seats</Text>
        <Text>This will have a number picker</Text>
      </View>
      <View style={styles.card}>
        <Text>Additional Notes</Text>
        <Text>This will have a text input</Text>
      </View>
      <View style={styles.card}>
        <Text>Button to submit</Text>
        <Text>This will have a button</Text>
      </View>
    </ScrollView>
    )
  }

  handleRoutePreview = () => {
    if(this.state.marker){
      return(<MapViewDirections
        origin={{latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng}}
        destination={{ latitude: this.state.marker.lat, longitude: this.state.marker.lng}}
        apikey={"AIzaSyAdweI54n6dgNJwQeGqGER9WYIESRkqEqE"}
        strokeWidth={3}
        strokeColor="blue"
      />)
    } else {
      return null
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View zIndex={1}>
            <MapView
              style={styles.mapStyle}
              region={this.state.mapRegion}
              onRegionChange={this.handleMapRegionChange}
            >
              <this.handleCircle/>
              <this.handlePinLocation/>
              <this.handleRoutePreview/>
            </MapView>
          </View>
            <View zIndex={2} style={styles.floatingUI}>
              <View style={{width: Dimensions.get('window').width - 100}}>
                <GooglePlacesAutocomplete
                  placeholder='Search'
                  minLength={2}
                  autoFocus={false}
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
                  onTouchCancel={() => console.log("touch ended")}
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

  floatingUI: {
    position: 'absolute', 
    padding: 20,
    transform: [
      {translateY: 30}
    ],
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rideButton: {
    padding: 20,
    width: Dimensions.get('window').width,
    borderColor: 'black',
    flex: 1
  },
  timePicker: {
    padding: 20,
    width: Dimensions.get('window').width,
    borderColor: 'black',
    flex: 1
  },
  scrollView: {
    position: 'absolute',
    bottom: -height + CARD_HEIGHT * 2,
    left: 0,
    right: 0,
    paddingTop: 10,
    
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: 3},
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  }
  
});

export default MapViewExample;