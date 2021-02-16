import React from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';
import { View, Text, StyleSheet} from 'react-native';
import { format } from "date-fns";
import MapView, {Marker} from 'react-native-maps';
import { NeuView } from 'react-native-neu-element';
import {joinRide} from '../../components/Firebase/firebase'
import { Dimensions } from 'react-native';
import { Appearance } from 'react-native-appearance';
import lightColors from '../../utils/lightColors'
import darkColors from '../../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function RideDetailScreen({route, navigation}){

    const { item } = route.params
    return(
        <SafeView style={styles.mainContainer}>
            <View style={styles.column}>
                <Text style={styles.text4}>Driver</Text>
                <Text style={styles.text3}>{item.deliverer}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Leaving:</Text>
                <View style={styles.textContainer3}>
                    <Text style={styles.text2}> {format(item.leaveTime.seconds * 1000, "hh:mm")}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Destination:</Text>
                <View style={styles.textContainer3}>
                    <Text style={styles.text2}> {item.title}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Notes:</Text>
                <View style={styles.textContainer3}>
                    <Text style={styles.text2}> {item.description}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Seats:</Text>
                <View style={styles.textContainer3}>
                    <Text style={styles.text2}> {item.seats}</Text>
                </View>
            </View>

            <View style={styles.column}>
                <Text style={styles.text4}>Riders:</Text>
                <View style={styles.row}>
                {item.riders.map((prop,key) => {
                    return (<Text style={styles.text5}>{prop.riderName}</Text>)
                })}
                </View>
            </View>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapStyle}
                    region={{latitude: item.destLat, longitude: item.destLng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                >
                    <Marker title={item.title} coordinate={{longitude: item.destLng, latitude: item.destLat}}/>
                </MapView>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="Join Ride" onPress={() => {joinRide(item)}}/>
            </View>

        </SafeView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.primary
    },
    text: {
        fontSize: 20,
        paddingTop: 5,
        padding: 5,
        paddingLeft: 18,
        fontWeight: '500',
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: 'center',
    },
    column: {
        flexDirection: "column",
        flex: 3,
        alignItems: 'center',

    },
    text2: {
        fontSize: 20,
        fontWeight: '300',
        paddingLeft: 18,
        padding: 2,
        color: Colors.blue,
        flex: 1,
        alignItems: 'flex-start'
    },
    text3: {
        fontSize: 20,
        fontWeight: '300',
        color: Colors.blue,
        padding: 5,
        flex: 2,
    },
    text4: {
        fontSize: 20,
        fontWeight: '500',
        flex: 2,
        paddingTop: 5,
    },
    text5: {
        fontSize: 18,
        fontWeight: '300',
        padding: 5,
        color: Colors.blue,
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    textContainer3: {
        alignItems: 'flex-end',
        flex: 1,
        paddingRight: 15,
    },
    mapContainer: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 15,
    },
    mapStyle: {
        width: 350,
        height: 200,
        position: 'relative',
        borderRadius: 10
    },
    buttonContainer: {
        padding: 10,
        paddingBottom: 10
    },
});
