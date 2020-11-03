import * as React from 'react';
import {Text, View} from 'react-native';
import SafeView from '../../components/SafeView';
import {logout} from '../../components/Firebase/firebase'
import AppButton from '../../components/AppButton';
import Colors from '../../utils/colors';
import { StyleSheet } from 'react-native';
import LogOutButton from '../../components/LogOutButton';

export default function Settings({navigation}) {
    return(
        <SafeView>
            <Text style={{fontSize: 40, textAlign: 'center', paddingTop: 10}}>Settings</Text>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Change Profile Image"
                        onPress={() => navigation.navigate('ChangeImage')}
                        width={300}
                        height={40}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Change Name"
                        onPress={() => navigation.navigate('ChangeName')}
                        width={300}
                        height={40}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <LogOutButton
                        title="Log Out"
                        onPress={() => logout()}
                        width={300}
                        height={40}
                    />
                </View>
            </View>
        </SafeView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 30,
        padding: 15,
        backgroundColor: Colors.primary
    },
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonContainer: {
        padding: 20,
    },
  });
