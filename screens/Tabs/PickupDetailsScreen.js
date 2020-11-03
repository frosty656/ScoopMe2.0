import React from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';
import { View, Text, StyleSheet} from 'react-native';
import { format } from "date-fns";
import MapView, {Marker} from 'react-native-maps';
import { NeuView } from 'react-native-neu-element';
import {joinRide} from '../../components/Firebase/firebase'


export default function ChangeName({route, navigation}){
    const { item } = route.params
    return(
        <SafeView>
            <View>
            <Text style={styles.text}>Driver {item.deliverer}</Text>
                 <Text style={styles.text}>Leaving: {format(item.leaveTime.seconds * 1000, "hh:mm")}</Text>
                 <Text style={styles.text}>Destination: {item.title}</Text>
                 <Text style={styles.text}>Notes: {item.description}</Text>
            </View>
            

            <MapView
            style={styles.mapStyle}
            region={{latitude: item.destLat, longitude: item.destLng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
            >
              
              <Marker title={item.title} coordinate={{longitude: item.destLng, latitude: item.destLat}}/>
            </MapView>
            <View style={styles.buttonContainer}>
                <AppButton title="Request Item" onPress={() => {}}/>
            </View>
            
        </SafeView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        padding: 5
    },
    mapStyle: {
        width: 400,
        height: 400,
      },
      buttonContainer: {
          padding: 10
      }
  });
  