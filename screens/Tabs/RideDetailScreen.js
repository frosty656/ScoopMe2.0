import React from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';
import { View, Text } from 'react-native';


export default function ChangeName({route, navigation}){
    const { item } = route.params
    return(
        <SafeView>
            <View style={{alignItems: 'center'}}>
                 <Text style={{fontSize: 20}}>{item.Deliverer} IS GOING TO {item.Destination}</Text>
            </View>
        </SafeView>
    );
}