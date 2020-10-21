import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import SafeView from '../components/SafeView';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function MessagesInboxScreen({ navigation }) {
    useStatusBar('light-content');
    return (
        <SafeView>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Welcome to Messages!</Text>
            </View>
        </SafeView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingBottom: 600
    },
    logoContainer: {
        position: 'absolute',
        top: 60,
        alignItems: 'center'
    },
    logo: {
        width: 125,
        height: 125
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        paddingVertical: 20,
        color: Colors.black
    },
    buttonContainer: {
        padding: 20,
        paddingBottom: 60,
        width: '100%'
    }
});

