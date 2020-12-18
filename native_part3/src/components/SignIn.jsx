import React from 'react';
import Text from './Text';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import { useField, Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
  name: yup
  .string()
  .min(5, "Name should be more than 5 leangth")
  .required("Name is required"),
  password: yup
  .string()
  .min(5, 'Lenth of pass word should be more than 5')
  .required('Password is required'),
})




const styles = StyleSheet.create({
input: {
    width: 200,
    height: 30,
    padding: 5,
    margin: 10,
    border: "1 solid grey",
    backgroundColor: "white",
    borderRadius: 5
},
button: {
    width: 200,
    height: 30,
    backgroundColor: 'blue',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    color: 'white'
}
})


const initialValues = {
    name: '',
    password: '',
  };


const SignInForm = ({onSubmit}) =>{
    const [nameField, nameMeta, nameHelper] = useField('name');
    const [passwordField, passwordMeta, passwordHelper] = useField('password');

    return (
    <View >
    <FormikTextInput name="name" placeholder="username" style={styles.input}/>
    <FormikTextInput name="password" placeholder="password" secureTextEntry style={styles.input}/>
    <TouchableWithoutFeedback onPress={onSubmit}>
          <Text style={styles.button}>Sign In</Text>
    </TouchableWithoutFeedback>
    </View>
    )
}

const SignIn = () => { 

    const onSubmit = (values)=>{

        console.log(values);
    }
  return (
      
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit})=><SignInForm onSubmit={handleSubmit}/>}
        </Formik>   
      
  )
};

export default SignIn;