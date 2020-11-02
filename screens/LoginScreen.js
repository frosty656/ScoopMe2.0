import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

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
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          borderRadius={100}
          secureTextEntry={false}
        />

        <FormButton title={'Go Here'} />

        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
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
    paddingBottom: 100,
  },
  inputRow: {
    borderWidth: 4,
    borderColor:"#20232a",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
