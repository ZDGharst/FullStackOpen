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
  }
});

const TextInput = ({ ...props }) => {
  return <NativeTextInput style={styles.input} {...props} />;
};

export default TextInput;