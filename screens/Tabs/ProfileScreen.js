import * as React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import ProfilePicture from './ProfilePictureScreen'
import SafeView from '../../components/SafeView';
import { auth} from '../../components/Firebase/firebase'
import IconButton from "../../components/IconButton";
import useStatusBar from "../../hooks/useStatusBar";
import MessagesInboxScreen from "../MessagesInboxScreen";
import AppButton from "../../components/AppButton";
import Colors from "../../utils/colors";

class SettingsScreen extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
        <SafeView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.container}>
                <ProfilePicture/>
                <Text style={styles.text}>{auth.currentUser.displayName}</Text>
            </View>

        </SafeView>

        );
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        padding: 10,
        fontSize: 20,
        color: Colors.mediumGrey
    },
    container: {
        alignItems: 'center',
        paddingTop: 30
    },

});
