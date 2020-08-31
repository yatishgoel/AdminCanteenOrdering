import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import RadioForm from "react-native-simple-radio-button";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import url from "../keys/url";
import Spinner from "react-native-loading-spinner-overlay";

import historyApi from "../api/history";

export default function AdminUserOrderDetails({route}) {
  const [loading, setLoading] = useState(false);
  const listing = route.params;
  
  const renderItem = (item) => (
    <View style={styles.detailsContainer}>
      {(item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )) || (
        <Image source={require("../assets/burger.jpg")} style={styles.image} />
      )}
      <View style={{ flexDirection: "row-reverse", flex: 1 }}>
        <AppText style={{ paddingRight: 15 }}>
          ₹{item.price * item.quantity}
        </AppText>
        <View style={styles.card}>
          <AppText style={styles.title}>
            {item.title}({item.quantity})
          </AppText>
          <AppText style={styles.price}>₹{item.price}</AppText>
        </View>
      </View>
    </View>
  );

 
  
  return (
    <View style={{ paddingLeft: 15 }}>
      <Spinner
        visible={loading}
        size="large"
        animation="fade"
        cancelable={true}
      />
      <Text
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 25,
          fontWeight: "bold",
          color: colors.cashGreen,
        }}
      >
        History
      </Text>
      <FlatList
        data={listing}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
  },
  detailsContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    borderRadius: 15,
    height: 70,
    marginRight: 10,
    width: 70,
  },
  price: {
    color: colors.secondary,
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    fontSize: 14,
  },
});
