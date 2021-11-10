import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.AppBarBG,
    marginTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" title="Repositories" />
        <AppBarTab to="/signin" title="Sign In" />
      </ScrollView>
    </View>
  );
};

export default AppBar;