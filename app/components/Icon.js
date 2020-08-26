import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  backgroundColor = "black",
  iconColor = "white",
  size = 40,
}) {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  );
}

export default Icon;
