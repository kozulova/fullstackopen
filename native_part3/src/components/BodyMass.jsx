import React from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
  mass: yup
  .number()
  .min(1, "Wight must be greater or equal to 1")
  .required("Weight is required"),
  height: yup
  .number()
  .min(0.5, 'Height must be greater or equal to 0.5')
  .required('Height is required'),
})

const initialValues = {
  mass: '',
  height: '',
};

const getBodyMassIndex = (mass, height) => {
  return (mass / Math.pow(height, 2)).toFixed(2);
};

const BodyMassIndexForm = ({ onSubmit }) => {
  const [massField, massMeta, massHelpers] = useField('mass');
  const [heightField, heightMeta, heightHelpers] = useField('height');

  return (
    <View>
      <FormikTextInput name="mass" placeholder="Weight"/>
      <FormikTextInput name="height" placeholder="Height"/>
      <TouchableWithoutFeedback onPress={onSubmit}>
      <View>
        <Text>Calculate</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const BodyMassIndexCalculator = () => {
  const onSubmit = values => {
    const mass = parseFloat(values.mass);
    const height = parseFloat(values.height);

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit}  />}
    </Formik>
  );
};

export default BodyMassIndexCalculator;