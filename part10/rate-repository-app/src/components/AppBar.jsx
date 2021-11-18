import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { AUTHORIZE } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.AppBarBG,
    marginTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(AUTHORIZE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  
  if(loading || !data.authorizedUser) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <AppBarTab to="/" title="Repositories" />
          <AppBarTab to="/signin" title="Sign In" />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" title="Repositories" />
        <AppBarTab onPress={signOut} to="/" title="Sign Out" />
      </ScrollView>
    </View>
  );
};

export default AppBar;