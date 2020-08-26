import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

function ListItemSeparator({ style }) {
  return <View style={[styles.separator, style]}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    backgroundColor: colors.light,
    height: 1,
  },
});

export default ListItemSeparator;
