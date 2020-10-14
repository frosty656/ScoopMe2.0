import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import SafeView from '../../components/SafeView';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
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


export default function GetRideInformation({ navigation }) {
  return (
    <SafeView style={styles.container}>
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