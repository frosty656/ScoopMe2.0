import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Dimensions, Button, TextInput, Text, Animated, ScrollView, Platform, TouchableOpacity, Image  } from 'react-native';
import SafeView from '../../components/SafeView';
import IconButton from '../../components/IconButton';
import Constants from 'expo-constants';
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import AppButton from '../../components/AppButton'
import * as Yup from 'yup';
import {createNewUser} from '../../components/Firebase/firebase'

import { Appearance } from 'react-native-appearance';
import lightColors from '../../utils/lightColors'
import darkColors from '../../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

const { width, height} = Dimensions.get("window");
// This should have all the code in one file
// Copy the photo and name to be accurate for first time users
// Only have the register button at the end

const signupValidationSchema = Yup.object().shape({
    email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
    password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

const nameValidationSchema = Yup.object().shape({
  name: Yup.string()
  .required('Please enter a name')
  .label('Name'),
})

const CARD_WIDTH = width * 0.9;

export default function RegisterNewuser({ navigation }){
    // Handle Register
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye-off');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [registerError, setRegisterError] = useState('');

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    function handleUploadInfo(){
      createNewUser(email, password, name, userImage)

    }

    function handleLogin(values) {
      //This should probably do some kind of check to see if an email exists already
      const { email, password } = values;
      setEmail(email)
      setPassword(password)
    }

    function handleName(values) {
      const { name } = values;
      setName(name)
    }


    function handlePasswordVisibility() {
        if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
        }
    }

    function handleConfirmPasswordVisibility() {
        if (confirmPasswordIcon === 'eye') {
        setConfirmPasswordIcon('eye-off');
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
        } else if (confirmPasswordIcon === 'eye-off') {
        setConfirmPasswordIcon('eye');
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }

    function SignUserUp(){
        return (
          <Form
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={signupValidationSchema}
            onSubmit={values =>handleLogin(values)}
          >
            <FormField
              name="email"
              leftIcon="email"
              placeholder="Enter email"
              placeholderTextColor={Colors.black}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              borderRadius={100}
              secureTextEntry={false}
              width={CARD_WIDTH*0.8}
            />
            <FormField
              name="password"
              leftIcon="lock"
              placeholder="Enter password"
              placeholderTextColor={Colors.black}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              rightIcon={rightIcon}
              secureTextEntry={passwordVisibility}
              onTap={handlePasswordVisibility}
              borderRadius={100}
              width={CARD_WIDTH*0.8}
            />
            <FormField
              name="confirmPassword"
              leftIcon="lock"
              placeholder="Confirm password"
              placeholderTextColor={Colors.black}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              rightIcon={confirmPasswordIcon}
              secureTextEntry={confirmPasswordVisibility}
              onTap={handleConfirmPasswordVisibility}
              borderRadius={100}
              width={CARD_WIDTH*0.8}
            />
            <FormButton title={'Register'} />
            {<FormErrorMessage error={registerError} visible={true} />}
          </Form>
        )
    }

    // Handle Name
    function SetUserName(){
      
        return(
          <Form
          initialValues={{
            name: '',
          }}
          validationSchema={nameValidationSchema}
          onSubmit={values =>handleName(values)}
        >
          <FormField
            name="name"
            placeholder="Enter Name"
            placeholderTextColor={Colors.black}
            autoCapitalize="words"
            borderRadius={100}
            secureTextEntry={false}
            width={CARD_WIDTH*0.8}
          />

          <FormButton title={'Register'} />
          {<FormErrorMessage error={registerError} visible={true} />}
        </Form>
        )
    }

    // Handle Image
    const [userImage, setUserImage] = useState('');

    async function getPermissionAsync() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      };

    useEffect(()=>{
        getPermissionAsync()
    })

    async function pickImage(){
      try {
        let result = await ImagePicker.launchImageLibraryAsync({  
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
            setUserImage(result.uri)
        }
      } catch (E) {
        console.log(E);
      }
    };
    
    async function resizeImage(){
      const height = Image.resolveAssetSource(userImage);
      const width = Image.resolveAssetSource(userImage);
      const manipResult = await ImageManipulator.manipulateAsync(
          userImage,
          [{ crop: {
            originX: 0,
            originY: (height - width) / 2,
            width: width,
            height: width
          } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
    }


    function SetUserProfileImage(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image style={{ width: 200, height: 200}} source={userImage ? { uri: userImage} : null}/>
                <AppButton title="Pick an image" onPress={() => {pickImage()}}/>
            </View>
        )
    }

    return(
        <SafeView style={styles.container}>
            <IconButton
                style={styles.backButton}
                iconName="keyboard-backspace"
                color={Colors.blue}
                size={40}
                onPress={() => navigation.goBack()}
            />
            <ScrollView 
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                style = {styles.scrollView}
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate={'fast'}
                scrollEnabled={true}
            >
                <View style={styles.card}>
                    <SignUserUp/>
                </View>
                <View style={styles.card}>
                    <SetUserName/>
                </View>
                <View style={styles.card}>
                   <View>
                    <SetUserProfileImage/>
                   </View>
                </View>
                <View style={styles.card}>
                  <View style={{height: '50%'}}/>
                  <AppButton title={"Sign Up"} onPress={() => handleUploadInfo()}/>
                </View>
            </ScrollView>
        </SafeView>
    )
}


const styles = StyleSheet.create({
    container: {

      flex: 1,
      backgroundColor: Colors.primary,
    },
    scrollView: {
      paddingTop: 10,
    },
    card: {
        height: 500,
        width: CARD_WIDTH,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 25,
        flex: 1,
        marginHorizontal: 10,
        shadowColor: Colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: 3},
    },
    backButton: {
      color: Colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 280,
      paddingBottom: 50,
    },
  });



  /*

  <Form
            initialValues={{Name:''}}
            validationSchema={nameValidationSchema}
            onSubmit={values => {handleName(values)}}
            >
                <FormField
                    name="name"
                    placeholder="John Smith"
                    placeholderTextColor={Colors.black}
                    borderRadius={100}
                    autoCorrect={false}
                    autoCapitalize="words"
                    width={CARD_WIDTH*0.8}
                />
                <FormButton title={'Change Name'} />
            </Form>

            */