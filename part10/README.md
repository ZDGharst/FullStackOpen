# Part 10 - React Native

## About React Native

Mark Zuckerburg once said that a big mistake that Facebook made was to develop web apps for mobile that ran in an embedded browser window. However, these applications aren't very performant and can't nail the look-and-feel of a native application.

React Native is a framework for developing native Android and iOS applications using JavaScript and React. It provides a set of cross-platform components that utilize the platform's native components behind the scenes. You get all of the familiar features of React such as JSX, components, props, state, and hooks in a native application. Many libraries, such as react-redux, react-apollo, react-router, etc. are able to be used.

The best benefit of React Native is the speed of development and gentle learning curve. 

## Setting up the environment

For this app, we will use Expo. Expo is a platform that handles setup, development, building, and deployment of React Native applications. Install globally with `npm install --global expo-cli`, and then initialize a project with `expo init rate-repository-app --template expo-template-blank@sdk-42 --npm`. With Expo, you can use your mobile device to install the Expo Go app and view the app being developed from there. Or, you can use an emulator or web view.

## Core components

There are [core components](https://reactnative.dev/docs/components-and-apis) built into React Native. Examples:

- Text: The only React Native component that can have textual children.
- View: Similar to a `div`.
- TextInput: Similar to `input`.
- Pressable: Similar to `button`.

## Style

Styling in React Native is very similar to using style in React. Most of the core components accept a style prop, and a style prop is an object that has attributes that are similar to CSS properties.

```js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
const styles = StyleSheet.create({  container: {    padding: 20,  },  text: {    color: 'blue',    fontSize: 24,    fontWeight: '700',  },});
const BigBlueText = () => {
  return (
    <View style={styles.container}>      <Text style={styles.text}>        Big blue text
      <Text>
    </View>
  );
};
```

The style prop can also accept an array of object styles.
```js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'grey',
    fontSize: 14,
  },
  blueText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

const FancyText = ({ isBlue, isBig, children }) => {
  const textStyles = [
    styles.text,
    isBlue && styles.blueText,
    isBig && styles.bigText,
  ];

  return <Text style={textStyles}>{children}</Text>;
};

const Main = () => {
  return (
    <>
      <FancyText>Simple text</FancyText>
      <FancyText isBlue>Blue text</FancyText>
      <FancyText isBig>Big text</FancyText>
      <FancyText isBig isBlue>
        Big blue text
      </FancyText>
    </>
  );
};
```

Using a `theme` object in an abstracted js file is a good idea, which can be imported for use.

```js
const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
```

## Routing in React Native

You can use either [React Navigation](https://reactnavigation.org/) or React Router Native for routing in React Native. Neither will be covered in these notes, as the material covers React Router Native v5, but v6 has come out which deprecates some of the material used. In the future, I may prefer to use React Navigation anyway as it offers more intrinsic features.

## Form state management

React's `useState` is useful for smaller forms, but for larger forms, libraries such as [Formik](https://jaredpalmer.com/formik/) are incredibly helpful. They manage the state, changes, validation, and more. Install with `npm install formik`.

```js
// 
import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    fontColor: 'red',
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;

// usage
const BodyMassIndexForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="mass" placeholder="Weight (kg)" />
      <FormikTextInput name="height" placeholder="Height (m)" />
      <Pressable onPress={onSubmit}>
        <Text>Calculate</Text>
      </Pressable>
    </View>
  );
};
```

## Form validation with Yup

You can create validation schema using various libraries. Install yup with `npm install yup`. Creaete a validation schema, and pass it into 

```js
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  mass: yup
    .number()
    .min(1, 'Weight must be greater or equal to 1')
    .required('Weight is required'),
  height: yup
    .number()
    .min(0.5, 'Height must be greater or equal to 0.5')
    .required('Height is required'),
});

const BodyMassIndexCalculator = () => {
  // ...

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}    >
      {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
```

## Platform specific code

You can use `Platform.select` and `Platform.OS` to perform platform specific operations.

```js
import { React } from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === 'android' ? 'green' : 'blue',
  },
});

const WhatIsMyPlatform = () => {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

const MyComponent = Platform.select({
  ios: () => require('./MyIOSComponent'),
  android: () => require('./MyAndroidComponent'),
})();

<MyComponent />;
```

