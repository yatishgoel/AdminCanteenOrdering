import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  removeFromCart,
  decreaseQuantity,
} from "../store/actions/mealsaction";

function Counter({ item }) {
  const cartItems = useSelector((state) => state.meals.cart);
  const dispatch = useDispatch();

  const existingIndex = cartItems.findIndex((meal) => meal._id === item._id);
  const [count, setCount] = useState(cartItems[existingIndex].quantity);

  const handleDecrement = () => {
    if (count === 1) {
      setCount(0);
      dispatch(removeFromCart(item._id));
    } else {
      setCount(count - 1);
      dispatch(decreaseQuantity(item._id));
    }
  };
  const handleIncrement = () => {
    setCount(count + 1);
    dispatch(increaseQuantity(item._id));
  };

  return (
    <View style={styles.detailsContainer}>
      <TouchableOpacity onPress={handleDecrement}>
        <MaterialCommunityIcons name="minus" size={20} color={colors.medium} />
      </TouchableOpacity>
      <AppText style={styles.text}>{count}</AppText>
      <TouchableOpacity onPress={handleIncrement}>
        <MaterialCommunityIcons name="plus" size={20} color={colors.medium} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 10,
    backgroundColor: colors.light,
    width: 100,
    height: 30,
  },
  text: {
    marginHorizontal: 10,
    color: colors.medium,
  },
});

export default Counter;
