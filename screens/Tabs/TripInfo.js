import * as React from 'react';
import { Text, View, Button, TextInput, SafeAreaView, FlatList } from 'react-native';



class TripInfo extends React.Component {
    render() {
        return(
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                <Text>
                    {this.props.user}
                </Text>
            </SafeAreaView>
        );
    }
}

export default TripInfo;