import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;