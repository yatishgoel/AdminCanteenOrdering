import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import RadioForm from "react-native-simple-radio-button";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import url from "../keys/url";
import Spinner from "react-native-loading-spinner-overlay";
import AuthContext from "../auth/context";

export default function OrderSummaryScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const k = route.params;
  const listing = k.data;
  const orderId = k.ID;
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
  //http://localhost:3000/admin/pending/5f48f07e841ec55830e4730e?orderId=5f4ab5b52315dcc234bb53af&orderStatus=1;

  const placeOrder = async () => {
    const url2 =
      url.ngrokUrl +
      "/admin/pending/" +
      user._id +
      "?orderId=" +
      orderId +
      "&orderStatus=" +
      confirmStatus;
    try {
      setLoading(true);
      let result = await fetch(url2, {
        method: "GET", // Method itself
      });
      const data2 = await result.text();
      console.log(data2);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  var radio_props = [
    { label: "Reject", value: 1 },
    { label: "Accept", value: 2 },
  ];
  const [confirmStatus, SetconfirmStatus] = useState(0);
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => renderItem(item)}
      />
      <RadioForm
        radio_props={radio_props}
        formHorizontal={false}
        labelHorizontal={true}
        initial={1}
        animation={false}
        onPress={(value) => {
          SetconfirmStatus(value);
          // post req
        }}
        labelStyle={{
          marginRight: 30,
        }}
      />
      <AppButton
        title="confirm"
        onPress={async () => {
          console.log(confirmStatus);
          await placeOrder();
          navigation.navigate(routes.ORDERS);
        }}
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
