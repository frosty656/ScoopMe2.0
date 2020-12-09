import React, { useState } from 'react';

import {changeUsersName} from '../../components/Firebase/firebase'
import Colors from "../../utils/colors";

import { View } from 'react-native';

import * as Yup from 'yup';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import SafeView from '../../components/SafeView';
import Form from '../../components/Forms/Form';

const validationSchema = Yup.object().shape({
    name: Yup.string()
    .required('Please enter a name')
    .min(1, 'Please enter name')
    .label('name'),
});

export default function ChangeName({navigation}){
    const [changeNameError, setChangeNameError] = useState('');
   
    function handleUpdateName(values, actions){
        console.log('Now entering the change name funciton')
        const {name} = values;
        try{
             changeUsersName(name)
             console.log('We are out of the change users name')
        } catch (error) {
            setChangeNameError(error.message)
        }   
    }


    return(
        <SafeView>
            <View style={{height: '100%', backgroundColor: Colors.primary}}>
                <Form
                initialValues={{name:''}}
                validationSchema={validationSchema}
                onSubmit={values => handleUpdateName(values)}
                >
                    <FormField
                        name="name"
                        placeholder="John Smith"
                        placeholderTextColor={Colors.black}
                        borderRadius={100}
                    />
                    <FormButton title={'Change Name'} />
                    {<FormErrorMessage error={changeNameError} visible={true}/>}
                </Form>
            </View>
            
        </SafeView>
    );
}