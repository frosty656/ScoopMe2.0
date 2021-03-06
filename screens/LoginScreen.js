import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';


import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';
import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});

export default function LoginScreen({ navigation }) {
  useStatusBar('light-content');
  const [loginError, setLoginError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);

    }
  }
  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color={Colors.blue}
          size={40}
          onPress={() => navigation.goBack()}
      />

      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          placeholderTextColor={Colors.black}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          borderRadius={100}
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
          borderRadius={100}
          secureTextEntry={passwordVisibility}
          onTap={handlePasswordVisibility}
        />

        <FormButton title={'Login'} />

        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{height: '70%'}}/>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: Colors.blue,
    fontSize: 15,
    fontWeight: '400'
  },
  backButton: {
    color: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 280,
    paddingBottom: 50,
  },
  inputRow: {
    borderWidth: 4,
    borderColor:"#20232a",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
