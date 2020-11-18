import React from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, TextInput, Text, Animated, ScrollView, Platform, TouchableOpacity  } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { isThisHour } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapViewDirections from 'react-native-maps-directions';
import Colors from "../../utils/colors";


import {newRide, newDelivery} from '../../components/Firebase/firebase'

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

    pickup: false,
    rideAlong: false,
    informationState: 0
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

  //Use colors here
  handleCircle = () => {
    if(this.state.currentLocation){
      return(
        <Circle 
          center={{latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng}} 
          radius={this.state.range} fillColor={Colors.lightBlue} 
          strokeColor={Colors.lightBlue}
        />
      )
    } else {
      return null
    }
  }

  handlePickupInformation = () => {
    if(this.state.pickup){
      return (
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
          <Button title="Back" onPress={() => {this.setState({pickup: false})}}/>
        </View>
        <View style={styles.card}>
        <DateTimePicker
                testID="dateTimePicker"
                value={this.state.leaveTime}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={ (event, selectedDate) => {this.setState({leaveTime: selectedDate})}}
                style={{width: CARD_WIDTH, height: CARD_HEIGHT}}
              />
        </View>
        <View style={styles.card}>
          <Text>Write a note</Text>
          <TextInput style={{ height: 40, borderColor: Colors.lightGrey, borderWidth: 1, borderRadius: 5 }} onChangeText={text => this.setState({desc: text})}/>
        </View>
        <View style={styles.card}>
        <Button title="Submit" onPress={() => {
          newDelivery(
            this.state.marker.title,
            this.state.marker.lng,
            this.state.marker.lat,
            this.state.currentLocation.lng,
            this.state.currentLocation.lat,
            this.state.leaveTime,
            this.state.desc, 
          )
          this.setState({pickup: false})}}/>
        </View>
      </ScrollView>
          )
    } else {
      return null
    }
  }

  handleDecisionMaking = () => {
    if(this.state.rideAlong == false && this.state.pickup == false && this.state.informationState == 1){
      return(
        <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Button title = "Pickup" onPress={() => {this.setState({pickup: true})}}/>
          <Button title = "Ride Along" onPress={() => {this.setState({rideAlong: true})}}/>
          <Button title='Cancel' onPress={() => {this.setState({seats: 4, pickup: false, rideAlong: false, informationState: 0, desc: "", marker: null})}}/>
        </View>
        </ScrollView>
      )
      } else {
        return null
      }
  }
  handleRideInformation = () => {
    //This is for if you are driving people
    if(this.state.rideAlong){
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
          <Button title="Back" onPress={() => {this.setState({rideAlong: false})}}/>
        </View>
        <View style={styles.card}>
        <DateTimePicker
                testID="dateTimePicker"
                value={this.state.leaveTime}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={ (event, selectedDate) => {this.setState({leaveTime: selectedDate})}}
                style={{width: CARD_WIDTH, height: CARD_HEIGHT}}
              />
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>Seats</Text>
          <View>
            <View style={{
              flexDirection: 'row', 
              alignItems:'center', 
              justifyContent: 'center', 
              }}>
              <TouchableOpacity onPress={() => this.setState({seats: this.state.seats - 1})} style={{width: '50%', height: CARD_HEIGHT, alignItems:'center', justifyContent: 'center', zIndex:3}}>
                <Text style={{fontSize: 20}}>-</Text>
              </TouchableOpacity>
              <Text style={{zIndex: 1, fontSize: 20}}>{this.state.seats}</Text>
              <TouchableOpacity onPress={() => this.setState({seats: this.state.seats + 1})} style={{width: '50%', height: CARD_HEIGHT, alignItems:'center', justifyContent: 'center', zIndex:3}}>
                <Text style={{fontSize: 20}}>+</Text>
              </TouchableOpacity>
            </View>

            </View>

        </View>
        <View style={styles.card}>
          <Text>Additional Notes</Text>
          <TextInput style={{ height: 40, borderColor: Colors.lightGrey, borderWidth: 1, borderRadius: 5 }} onChangeText={text => this.setState({desc: text})}/>
        </View>
        <View style={styles.card}>
        <Button style={styles.buttonStyle} title="Submit" onPress={
                () => {newRide(
                  this.state.marker.title,
                  this.state.marker.lng,
                  this.state.marker.lat,
                  this.state.currentLocation.lng,
                  this.state.currentLocation.lat,
                  this.state.leaveTime,
                  this.state.desc, 
                  this.state.seats
                ) 
                this.setState({seats: 4, pickup: false, rideAlong: false, informationState: 0, desc: "", marker: null})
              }
                } />
        </View>
      </ScrollView>
      )
    } else {
      return null
    }
  }

  handleRoutePreview = () => {
    if(this.state.marker){
      return(<MapViewDirections
        origin={{latitude: this.state.currentLocation.lat, longitude: this.state.currentLocation.lng}}
        destination={{ latitude: this.state.marker.lat, longitude: this.state.marker.lng}}
        apikey={"AIzaSyAdweI54n6dgNJwQeGqGER9WYIESRkqEqE"}
        strokeWidth={3}
        strokeColor={Colors.blue}
      />)
    } else {
      return null
    }
  }
  //TODO: Change the map region when displaying a route preview
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
              <View style={{width: '90%'}}>
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
                    this.setState({informationState: 1})
                   // console.log(data);
                  }}
                  disableScroll={true}
                  
                  getDefaultValue={() => {
                    return ''; // text input default value
                  }}
                  query={{
                    key: 'AIzaSyAdweI54n6dgNJwQeGqGER9WYIESRkqEqE', //TODO: Store this in a file elsewhere
                    language: 'en',
                    rankby: 'distance',
                  }}
                  enablePoweredByContainer={false}
                  suppressDefaultStyles={true}
                  styles={{
                    container: {
                      flex: 1,
                    },
                    textInputContainer: {
                      position: 'absolute',
                      marginTop: Platform.os == 'ios' ? 20 : 10,
                      flexDirection: 'row',
                      backgroundColor: Colors.white,
                      alignSelf: 'center',
                      borderRadius: 5,
                      padding: 10,
                      shadowColor: Colors.mediumGrey,
                      shadowOffset: {width: 0, height: 3},
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      zIndex: 10
                    },
                    textInput: {
                      flex: 1,
                      padding: 0
                    },
                    poweredContainer: {
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    },
                    powered: {},
                    listView: {zIndex: 1, backgroundColor: Colors.white, transform: [{translateY: 50}]},
                    row: {
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                    },
                    separator: {
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: Colors.lightGrey,
                    },
                    description: {},
                    loader: {
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      height: 20,
                    },
                  
                  }
                }
                />
              </View>
              <this.handleRideInformation/>
              <this.handleDecisionMaking/>
              <this.handlePickupInformation/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonStyle: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: Colors.white
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
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: 3},
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  }
  
});

export default MapViewExample;


/*
                  
                  */