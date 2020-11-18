import React, { useState } from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { format } from "date-fns";
import MapView, {Marker} from 'react-native-maps';
import { NeuButton } from 'react-native-neu-element'
import Colors from "../../utils/colors";
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    itemDesc: Yup.string()
      .required('Please enter an item')
      .label('itemDesc')
  });

export default function PickupDetailsScreen({route, navigation}){
    const { item } = route.params

    const [getInfo, setGetInfo] = useState(0)
    const [getItemInfo, setItemInfo] = useState([{"item": "", "size": "s"}])
    const [getSmallButton, setSmallButton] = useState(false)
    const [getMediumButton, setMediumButton] = useState(true)
    const [getLargeButton, setLargeButton] = useState(false)
    const [getitemText, setItemText] = useState("")


    async function handleOnSubmit(values) {
        const { itemDesc } = values;
      }

    function HandleItemInfo() {
        if(getInfo){
            return (
                //One master view
                    //One view to cover background
                    //One view to get user information
                <View zIndex={1} style={{position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '120%'}}>
                    <TouchableOpacity
                    zIndex={3}
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        backgroundColor:'grey',
                        opacity: .5}}
                        onPress={() => {setGetInfo(!getInfo)}}
                        />
                    <View zIndex={4} style={{
                        backgroundColor: 'white',
                        position: "absolute",
                        borderRadius: 10,
                        width: '90%',
                        height: '50%',
                        padding: 10}}>

                        <Text style={{fontSize: 20}}>Item Size</Text>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                            <View style={{padding: 10}}>
                                <AppButton
                                    title="Small"
                                    width={70}
                                    height={35}
                                    borderRadius={16}
                                    active={getSmallButton}
                                    onPress={ () =>{
                                        setSmallButton(true)
                                        setMediumButton(false)
                                        setLargeButton(false)
                                    }}
                                    style={{marginRight: 30}}>
                                </AppButton>
                            </View>
                            <View style={{padding: 10}}>
                                <AppButton
                                    title="Medium"
                                    width={70}
                                    height={35}
                                    borderRadius={16}
                                    active={getMediumButton}
                                    onPress={ () =>{
                                        setSmallButton(false)
                                        setMediumButton(true)
                                        setLargeButton(false)
                                    }}
                                    style={{marginRight: 30}}>
                                </AppButton>
                            </View>
                            <View style={{padding: 10}}>
                                <AppButton
                                    title="Large"
                                    width={70}
                                    height={35}
                                    borderRadius={16}
                                    active={getLargeButton}
                                    onPress={ () =>{
                                        setSmallButton(false)
                                        setMediumButton(false)
                                        setLargeButton(true)
                                    }}
                                    style={{marginRight: 30}}>
                                </AppButton>
                            </View>
                        </View>
                        <Text style={{fontSize: 20}}>Item</Text>

                        <Form
                            initialValues={{ itemDesc: ''}}
                            validationSchema={validationSchema}
                            onSubmit={values => handleOnLogin(values)}
                        >
                            <FormField
                                name="itemDesc"
                                placeholder="Item"
                                autoCapitalize="none"
                                autoFocus={true}
                                borderRadius={100}
                            />

                            <FormButton title={'Request'} />
                        </Form>
                    </View>
                </View>
            )
        }
        return(null)
    }

    return(
        <SafeView>
            <View>
                <HandleItemInfo/>
                <View zIndex={0}>
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


                    <MapView
                    style={styles.mapStyle}
                    region={{latitude: item.destLat, longitude: item.destLng, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                    >

                    <Marker title={item.title} coordinate={{longitude: item.destLng, latitude: item.destLat}}/>
                    </MapView>
                    <View style={styles.buttonContainer}>
                        <AppButton title="Request Item" onPress={() => {setGetInfo(!getInfo)}}/>
                    </View>
                </View>
            </View>
        </SafeView>
    );
}

const styles = StyleSheet.create({
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
    },
    column: {
        flexDirection: "column",
        flex: 2,
        alignItems: 'center',
    },
    text2: {
        fontSize: 20,
        fontWeight: '300',
        paddingLeft: 18,
        padding: 5,
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
        paddingTop: 15,
    },
    textContainer: {
        alignItems: 'center',
    },
    textContainer3: {
        alignItems: 'flex-end',
        flex: 1,
        paddingRight: 15,
    },
    mapStyle: {
        width: 400,
        padding: 10,
    },
      buttonContainer: {
          padding: 10
      }
  });
