import * as React from 'react';
import { Text, View, Button } from 'react-native';

import ProfilePicture from './ProfilePictureScreen'
import SafeView from '../../components/SafeView';
import { auth} from '../../components/Firebase/firebase'
import IconButton from "../../components/IconButton";
import useStatusBar from "../../hooks/useStatusBar";
import MessagesInboxScreen from "../MessagesInboxScreen";
import AppButton from "../../components/AppButton";

class SettingsScreen extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
        <SafeView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{fontSize: 50}}>Profile!</Text>
            <ProfilePicture/>
            <Text style={{fontSize: 30}}>{auth.currentUser.displayName}</Text>
        </SafeView>

        );
    }
}

export default SettingsScreen;

