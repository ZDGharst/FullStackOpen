import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FormikTextInput from './FormikTextInput';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  submit: {
    backgroundColor: 'blue',
    marginHorizontal: 15,
    borderRadius: 3,
    marginVertical: 5,
    padding: 15,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

const initialValues = {
  username: '',
  height: '',
};

const SignInForm = ({ onSubmit }) => 
  <View style={style.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <Pressable onPress={onSubmit} style={style.submit}>
      <Text style={style.submitText}>Sign In</Text>
    </Pressable>
  </View>;

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.password;

    console.log(username, password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;