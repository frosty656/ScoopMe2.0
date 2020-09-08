import React from 'react';
import AppButton from '../../components/AppButton'
import SafeView from '../../components/SafeView';


export default function ChangeName({route, navigation}){
    const { item } = route.params
    return(
        <SafeView>
            
            <AppButton title={item.Deliverer} onPress={()=>navigation.goBack()}/>
        </SafeView>
    );
}