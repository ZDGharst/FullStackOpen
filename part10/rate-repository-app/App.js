import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  </NativeRouter>
);

export default App;