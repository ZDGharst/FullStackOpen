import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: theme.colors.AppBarText,
  }
});

const AppBarTab = () => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;