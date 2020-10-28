import React from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';
import { View, Text, StyleSheet} from 'react-native';
import { format } from "date-fns";
import MapView, {Marker} from 'react-native-maps';


export default function ChangeName({route, navigation}){
    const { item } = route.params
    var date = new Date("2016/01/04 10:34:23")
    return(
        <SafeView>
            <View style={{alignItems: 'center', backgroundColor: "white"}}>
            <Text style={styles.text}>Driver {item.deliverer}</Text>
                 <Text style={styles.text}>Time: {format(item.leaveTime.seconds * 1000, "hh:mm")}</Text>
                 
                 <Text style={styles.text}>Destination: {item.title}</Text>
                 <Text style={styles.text}>Notes: {item.description}</Text>
                 <Text style={styles.text}>Seats: {item.seats}</Text>
            </View>

            <MapView
            style={styles.mapStyle}
            region={{latitude: item.destLat, longitude: item.destLng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
            >
              
              <Marker title={item.title} coordinate={{longitude: item.destLng, latitude: item.destLat}}/>
            </MapView>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        padding: 20
    },
    mapStyle: {
        width: 400,
        height: 400,
      },
  });
  