import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: theme.colors.AppBarText,
  }
});

const AppBarTab = ({ to, title }) => {
  return (
    <Link to={to} style={styles.container}><Text style={styles.text}>{title}</Text></Link>
  );
};

export default AppBarTab;