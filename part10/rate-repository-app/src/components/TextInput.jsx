import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  error: {
    borderColor: 'red',
  }
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [
    styles.input,
    error && styles.error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;