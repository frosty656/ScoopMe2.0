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
        <SafeView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{fontSize: 35, padding: 10}}>Profile</Text>
            <ProfilePicture style={{padding: 25}}/>
            <Text style={{fontSize: 20, paddingTop: 20, color: 'grey'}}>{auth.currentUser.displayName}</Text>
        </SafeView>
        );
    }
}

export default SettingsScreen;
