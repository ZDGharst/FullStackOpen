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

## HTTP requests

React native provides the Fetch API for making HTTP requests, however, you can also still use XMLHttpRequest API. XMR is older and less modern, but it's still there if needed. Fetch API is incredibly easy to use.

```js
const fetchMovies = async () => {
  const response = await fetch('https://reactnative.dev/movies.json');
  const json = await response.json();

  return json;
};

fetch('https://my-api.com/post-end-point', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'firstValue',
    secondParam: 'secondValue',
  }),
});
```

## GraphQL and Apollo Client

Install with `npm install @apollo/client graphql`. Create an Apollo client, and wrap the context of it around your application. And now you can use GraphQL as learned in part 8.

```js
// createApolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: 'http://192.168.100.16:5000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

// App.js
import createApolloClient from './src/utils/apolloClient';
const apolloClient = createApolloClient();
const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};
```

## Environment variables

Environment variables in React Native are a bit harder to manage considering they build specifically to each mobile OS. Environment variables should be added to `app.config.js` (rename app.json and switch to an exported object), and imported to files that need them with `import Constants from 'expo-constants'`.

```js
// app.config.js
export default {
   name: 'rate-repository-app',
   // rest of the configuration...
   extra: {
    env: process.env.ENV,
  },
};

// other files
import Constants from 'expo-constants';

console.log(Constants.manifest.extra.env);
```

## Storing data on the user's device

AsyncStorage provides the ability to store key-value pairs on the user's device. Install with `expo install @react-native-async-storage/async-storage`. The documentation for AsyncStorage recommends always creating an abstraction layer on top of the API.

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShoppingCartStorage {
  constructor(namespace = 'shoppingCart') {
    this.namespace = namespace;
  }

  async getProducts() {
    const rawProducts = await AsyncStorage.getItem(
      `${this.namespace}:products`,
    );

    return rawProducts ? JSON.parse(rawProducts) : [];
  }

  async addProduct(productId) {
    const currentProducts = await this.getProducts();
    const newProducts = [...currentProducts, productId];

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts),
    );
  }

  async clearProducts() {
    await AsyncStorage.removeItem(`${this.namespace}:products`);
  }
}
```

## Infinite Scrolling

The `FlatList` component has a prop, `onEndReached`, which can be used to call a function. Additionally, Apollo client can be configured to add a field policy to customize the behavior during read and write operations.

```js
// appolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import { relayStylePagination } from '@apollo/client/utilities';
const { apolloUri } = Constants.manifest.extra;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const cache = new InMemoryCache({  typePolicies: {    Query: {      fields: {        repositories: relayStylePagination(),      },    },  },});
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);

      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,  });
};

export default createApolloClient;

// useRepositories.js
const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    // ...
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

// RepositoryList.jsx
const RepositoryList = () => {
  // ...

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    // ...
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      // ...
    />
  );
};

export default RepositoryList;
```

## Testing React Native

Needed packages: `npm install --save-dev jest jest-expo eslint-plugin-jest`. Add `jest` as a script to package.json, along with some configuration for jest in both package.json and .eslintrc:

```js
// package.json
{
  // ...
  "scripts": {
    // other scripts...
    "test": "jest"
  },
  "jest": {
    "preset": "jest-expo",  
    "transform": { 
    "^.+\\.jsx?$": "babel-jest" 
    },   
    "transformIgnorePatterns": [    
      "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-router-native)"  
    ] 
  },
}

// .eslintrc
  // ...
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
```

Tests should be included either in the `__tests__` folder or alongside the actual code with a .test.js suffix. An example test:

```js
describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});
```

You will also need to add React Native Testing Library, `npm install --save-dev react-test-renderer@16.13.1 @testing-library/react-native @testing-library/jest-native`. Add a file, `setupTests.js`, to the root directory of the project (same level as `src`). Add this line to the jest configuration in package.json: `"setupFilesAfterEnv": ["<rootDir>/setupTests.js"]`.

Here's an example component test:

```js
import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      {/* This node is tagged with the testID prop */}
      <Text testID="greetingText">Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { debug, getByTestId } = render(<Greeting name="Kalle" />);

    debug();

    expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
  });
});
```

Your components may need to be rewritten such that dependencies and side effects are as abstracted away as possible.

## Additional resources

[Awesome React Native](https://github.com/jondot/awesome-react-native) is an extremely encompassing curated list of React Native resources such as libraries, tutorials, and articles. [React Native Paper](https://callstack.github.io/react-native-paper/) offers a wide range of high-quality UI compponents, support for custome themes, etc. [Styled components](https://styled-components.com/) is a library for styling React components using CSS-in-JS tecnique. Styled-components make it possible to define new style properties for components at runtime (such as switching between a dark and light theme). [React-spring](https://www.react-spring.io/) is a library that provides a clean hook API for animating React Native components. [React Navigation](https://reactnavigation.org/) is a routing library that offers more native features such as gestures and animations to transition between views.
