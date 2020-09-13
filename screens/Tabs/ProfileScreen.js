import * as React from 'react';
import { Text, View, Button } from 'react-native';


import ProfilePicture from './ProfilePictureScreen'
import SafeView from '../../components/SafeView';
import { auth} from '../../components/Firebase/firebase'

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <SafeView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' , paddingTop: 30}}>
            <ProfilePicture/>
            <Text style={{fontSize: 25, padding: 15,}}>{auth.currentUser.displayName}</Text>

            <Text style={{fontSize: 15, padding: 10}}>{"Passenger"}</Text>
        </SafeView>
        );
    }
}

export default SettingsScreen;
